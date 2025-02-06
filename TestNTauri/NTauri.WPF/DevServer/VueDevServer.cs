using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Reflection;
using NTauri.WPF.Models;

namespace NTauri.WPF.DevServer
{
    public class VueDevServer : IDisposable
    {
        private Process? _vueProcess;
        private readonly string _vuePath;
        private readonly int _port;

        public VueDevServer(string vuePath, StartupMode startupMode, int port = 3000)
        {
            NTauriConfig.NtauriConfig = new NTauriConfigModel()
            {
                VueProjectPath = vuePath,
                StartupMode = startupMode,
                VueDevServerPort = port
            };
            // 获取项目根目录
            string projectRoot = string.Empty;
            if (NTauriConfig.NtauriConfig.StartupMode == StartupMode.ProdServer)
            {
                projectRoot = AppDomain.CurrentDomain.BaseDirectory;
            }
            else if (NTauriConfig.NtauriConfig.StartupMode == StartupMode.DevServer)
            {
                projectRoot = GetProjectRootPath();
            }

            _vuePath = Path.GetFullPath(Path.Combine(projectRoot, NTauriConfig.NtauriConfig.VueProjectPath));
            _port = NTauriConfig.NtauriConfig.VueDevServerPort;
        }

        public VueDevServer()
        {
            if (NTauriConfig.NtauriConfig is null)
                throw new ArgumentNullException(nameof(NTauriConfig));
            // 获取项目根目录
            string projectRoot = string.Empty;
            if (NTauriConfig.NtauriConfig.StartupMode == StartupMode.ProdServer)
            {
                projectRoot = AppDomain.CurrentDomain.BaseDirectory;
            }
            else if (NTauriConfig.NtauriConfig.StartupMode == StartupMode.DevServer)
            {
                projectRoot = GetProjectRootPath();
            }

            _vuePath = Path.GetFullPath(Path.Combine(projectRoot, NTauriConfig.NtauriConfig.VueProjectPath));
            _port = NTauriConfig.NtauriConfig.VueDevServerPort;
        }

        private string GetProjectRootPath()
        {
            // 获取当前程序集所在目录
            string currentDir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            DirectoryInfo directory = new DirectoryInfo(currentDir);

            // 向上查找，直到找到包含 .sln 或 .csproj 文件的目录
            while (directory != null && !directory.GetFiles("*.sln").Any()
                  )
            {
                directory = directory.Parent;
            }

            if (directory == null)
            {
                throw new DirectoryNotFoundException("Could not find project root directory");
            }

            return directory.FullName;
        }

        private string GetNpmPath()
        {
            // 在 Windows 上，npm 通常在这些位置
            var possiblePaths = new[] {
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "nodejs", "npm.cmd"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "nodejs", "npm.cmd"),
                // 用户安装的 Node.js
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "npm", "npm.cmd")
            };

            foreach (var path in possiblePaths)
            {
                if (File.Exists(path))
                {
                    return path;
                }
            }

            // 如果找不到 npm，尝试从环境变量中获取
            var npmFromPath = GetCommandPath("npm.cmd") ?? GetCommandPath("npm");
            if (!string.IsNullOrEmpty(npmFromPath))
            {
                return npmFromPath;
            }

            throw new FileNotFoundException("Could not find npm. Please ensure Node.js is installed.");
        }

        private string GetCommandPath(string command)
        {
            var paths = Environment.GetEnvironmentVariable("PATH")?.Split(Path.PathSeparator);
            if (paths == null) return null;

            foreach (var path in paths)
            {
                var fullPath = Path.Combine(path, command);
                if (File.Exists(fullPath))
                {
                    return fullPath;
                }
            }

            return null;
        }

        public async Task StartAsync()
        {
            try
            {
                // 确保 Vue 项目目录存在
                if (!Directory.Exists(_vuePath))
                {
                    throw new DirectoryNotFoundException($"Vue project directory not found: {_vuePath}");
                }

                Debug.WriteLine($"Starting Vue dev server in: {_vuePath}");

                var npmPath = GetNpmPath();
                Debug.WriteLine($"Using npm from: {npmPath}");

                // 配置进程启动信息
                var startInfo = new ProcessStartInfo
                {
                    FileName = npmPath,
                    Arguments = $"run dev -- --port {_port}",
                    WorkingDirectory = _vuePath,
                    UseShellExecute = NTauriConfig.NtauriConfig?.StartupMode == StartupMode.DevServer,
                    RedirectStandardOutput = NTauriConfig.NtauriConfig?.StartupMode != StartupMode.DevServer,
                    RedirectStandardError = NTauriConfig.NtauriConfig?.StartupMode != StartupMode.DevServer,
                    CreateNoWindow = true,

                };
                if (NTauriConfig.NtauriConfig?.StartupMode == StartupMode.DevServer)
                {
                    startInfo.FileName = "cmd.exe";

                    startInfo.Arguments = $"/c start start-vue-dev-server.bat {_port}";
                }
                else
                {
                    // 添加环境变量
                    startInfo.Environment["PATH"] = Environment.GetEnvironmentVariable("PATH");
                }

                // 启动 Vue 开发服务器
                _vueProcess = new Process { StartInfo = startInfo };
                _vueProcess.OutputDataReceived += (sender, e) =>
                {
                    if (!string.IsNullOrEmpty(e.Data))
                        Debug.WriteLine($"Vue: {e.Data}");
                };
                _vueProcess.ErrorDataReceived += (sender, e) =>
                {
                    if (!string.IsNullOrEmpty(e.Data))
                        Debug.WriteLine($"Vue Error: {e.Data}");
                };

                _vueProcess.Start();
                if (NTauriConfig.NtauriConfig?.StartupMode == StartupMode.ProdServer)
                {
                    _vueProcess.BeginOutputReadLine();
                    _vueProcess.BeginErrorReadLine();
                }


                await WaitForServerReadyAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Failed to start Vue dev server: {ex.Message}");
                throw;
            }
        }

        private async Task WaitForServerReadyAsync()
        {
            using var client = new HttpClient();
            var retryCount = 0;
            const int maxRetries = 30; // 最多等待30秒

            while (retryCount < maxRetries)
            {
                try
                {
                    var response = await client.GetAsync($"http://localhost:{_port}");
                    if (response.IsSuccessStatusCode)
                    {
                        Debug.WriteLine("Vue dev server is ready!");
                        return;
                    }
                }
                catch
                {
                    // 忽略异常，继续等待
                }

                await Task.Delay(1000); // 等待1秒后重试
                retryCount++;
            }

            throw new TimeoutException("Vue dev server failed to start in time");
        }

        public void Dispose()
        {
            try
            {
                // 关闭指定端口的进程
                KillProcessByPort(_port);

                // 清理主进程（如果还存在）
                if (_vueProcess != null && !_vueProcess.HasExited)
                {
                    try
                    {
                        _vueProcess.Kill(true);
                        _vueProcess.WaitForExit(1000);
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine($"Error killing main process: {ex.Message}");
                    }
                    finally
                    {
                        _vueProcess.Dispose();
                        _vueProcess = null;
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error during dispose: {ex.Message}");
            }
        }

        private void KillProcessByPort(int port)
        {
            try
            {
                // 使用 netstat 命令查找使用指定端口的进程
                var processStartInfo = new ProcessStartInfo
                {
                    FileName = "cmd",
                    Arguments = $"/c netstat -ano | findstr :{port}",
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                };

                using var process = Process.Start(processStartInfo);
                string output = process.StandardOutput.ReadToEnd();
                process.WaitForExit();

                // 解析输出找到 PID
                foreach (string line in output.Split('\n'))
                {
                    if (string.IsNullOrWhiteSpace(line)) continue;

                    // TCP    127.0.0.1:3000     0.0.0.0:0     LISTENING   12345
                    var parts = line.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                    if (parts.Length > 4)
                    {
                        string pidStr = parts[parts.Length - 1].Trim();
                        if (int.TryParse(pidStr, out int pid))
                        {
                            try
                            {
                                var processToKill = Process.GetProcessById(pid);
                                processToKill.Kill(true);
                                processToKill.WaitForExit(1000);
                                Debug.WriteLine($"Killed process {pid} using port {port}");
                            }
                            catch (Exception ex)
                            {
                                Debug.WriteLine($"Error killing process {pid}: {ex.Message}");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error killing process by port: {ex.Message}");
            }
        }
    }
}