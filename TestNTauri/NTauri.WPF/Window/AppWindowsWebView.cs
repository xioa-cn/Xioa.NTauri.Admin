﻿using NTauri.WPF.DevServer;
using NTauri.WPF.Models;
using NTauri.WPF.TauriServer;
using NTauri.WPF.Utils;

namespace NTauri.WPF.Window
{
    public class AppWindowsWebView
    {
        /// <summary>
        /// 主窗口
        /// </summary>
        public MainWindow MainWindow { get; private set; }

        public WindowsWebView? WindowsWebView;
        public VueDevServer _vueServer;

        public async Task StartupVueServer(string? path, StartupMode? startupMode, 
            int port,Dictionary<string, object>? args = null,bool noShell = false)
        {
            _vueServer = new VueDevServer(
                path,
                StartupMode.DevServer,
                port,
                noShell
            );
            await
                VueServerStartAsync(args);
        }

        public async Task StartupVueServer()
        {
            _vueServer = new VueDevServer();
            await
                VueServerStartAsync();
        }

        private async Task VueServerStartAsync(Dictionary<string, object>? args = null)
        {
            MainWindow = new MainWindow();
            WindowsWebView = new WindowsWebView(MainWindow.webView);
            WindowsWebView.WebviewMethods = args;
            // 启动 Vue 开发服务器
            await _vueServer.StartAsync();
            MainWindow.Closing += async (sender, args) =>
            {
                // 取消关闭事件
                args.Cancel = true;
                // 先关闭 Vue 服务器
                _vueServer.Dispose();
                MainWindow.Dispose();
                // 现在可以安全关闭窗口
                args.Cancel = false;
                Environment.Exit(0);
            };
            MainWindow.Show();
            if (WindowsWebView is not null)
            {
                await WindowsWebView.InitializeAsync();
                WindowsWebView.AddListenerWindow(MainWindow);
                
                await WindowsWebView.LoadUrlAsync(
                    $"http://localhost:{NTauriConfig.NtauriConfig.VueDevServerPort}/");
                await WindowsWebView.SendMessageAsync("message", "Hello from C#!");
            }
        }
    }
}