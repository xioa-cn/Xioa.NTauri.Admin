using System.Text.Json;
using System.Windows;
using System.Windows.Input;
using Microsoft.Web.WebView2.Core;
using NTauri.WPF.Models;
using NTauri.WPF.TauriServer;
using System.Runtime.InteropServices;
using System.Windows.Interop;
using System.Windows.Threading;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Diagnostics;

namespace NTauri.WPF.Window
{
    public partial class MainWindow : System.Windows.Window, IDisposable
    {
        private bool isDragging = false;
        private DateTime lastDragTime = DateTime.MinValue;
        private const int MIN_DRAG_INTERVAL = 50; // 毫秒
        private const int MAX_RETRY_COUNT = 3;
        private int navigationRetryCount = 0;
        private bool isDisposed = false;
        private const int NAVIGATION_TIMEOUT = 30000; // 30秒超时
        private CancellationTokenSource? _navigationCts;
        private readonly Queue<Action> _messageQueue = new Queue<Action>();
        private bool _isProcessingQueue = false;
        private readonly object _queueLock = new object();

        [DllImport("user32.dll")]
        private static extern bool GetCursorPos(out POINT lpPoint);

        [DllImport("user32.dll")]
        private static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

        [DllImport("user32.dll")]
        private static extern IntPtr GetForegroundWindow();

        [DllImport("user32.dll")]
        private static extern bool SetForegroundWindow(IntPtr hWnd);

        [DllImport("user32.dll", SetLastError = true)]
        private static extern bool ReleaseCapture();

        [DllImport("user32.dll", SetLastError = true)]
        //private static extern int SendMessage(IntPtr hWnd, int Msg, int wParam, int lParam);
        public static extern IntPtr PostMessage(IntPtr hWnd, uint wMsg, 
            UIntPtr wParam, IntPtr lParam);
        [StructLayout(LayoutKind.Sequential)]
        private struct POINT
        {
            public int X;
            public int Y;
        }

        private const uint SWP_NOSIZE = 0x0001;
        private const uint SWP_NOZORDER = 0x0004;
        private POINT lastPos;
        private bool isFirstMove = true;  // 添加标记来识别第一次移动

        public MainWindow()
        {
            InitializeComponent();
            TaskScheduler.UnobservedTaskException += TaskScheduler_UnobservedTaskException;

            // 添加WebView2事件处理
            webView.NavigationCompleted += WebView_NavigationCompleted;
            webView.CoreWebView2InitializationCompleted += WebView_CoreWebView2InitializationCompleted;

            // 添加快捷键处理
            KeyDown += MainWindow_KeyDown;
        }
        private void WebView_CoreWebView2InitializationCompleted(object? sender,
            CoreWebView2InitializationCompletedEventArgs e)
        {
            if (e.IsSuccess)
            {
                try
                {
                    var webView2 = sender as Microsoft.Web.WebView2.Wpf.WebView2;
                    if (webView2?.CoreWebView2 != null)
                    {
                        // 设置WebView2选项
                        webView2.CoreWebView2.Settings.IsStatusBarEnabled = false;
                        webView2.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
                        webView2.CoreWebView2.Settings.AreBrowserAcceleratorKeysEnabled = false;
                        webView2.CoreWebView2.Settings.IsScriptEnabled = true;
                        webView2.CoreWebView2.Settings.AreDevToolsEnabled = true;

                        // 添加事件处理
                        webView2.CoreWebView2.ProcessFailed += CoreWebView2_ProcessFailed;
                        webView2.CoreWebView2.WebMessageReceived += CoreWebView2_WebMessageReceived;

                        // 修改 JavaScript 代码，只在鼠标移动时触发
                        webView2.CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync(@"
                            if (!window._dragInitialized) {
                                window._dragInitialized = true;
                                window._lastDragTime = 0;
                                window._isDragging = false;
                                const THROTTLE_TIME = 16;  // 约60fps

                                document.addEventListener('mousedown', (e) => {
                                    // 只在鼠标左键按下时处理
                                    if (e.button !== 0) return;  // 0 表示左键
                                    if(window._isDragging) return;
                                    window._isDragging = true;

                                    let element = e.target;
                                    while (element) {
                                        if (element.classList && 
                                            (element.classList.contains('titlebar') || 
                                             element.classList.contains('drag-region'))) {
                                            
                                            window.chrome.webview.postMessage(JSON.stringify({
                                                type: 'dragWindow',
                                                button: e.button,
                                                buttons: e.buttons
                                            }));
                                            console.log('send-drag')
                                            break;
                                        }
                                        element = element.parentElement;
                                    }
                                });

                                document.addEventListener('mouseup', () => {
                                    // 添加100ms延时后再设置为false
                                    setTimeout(() => {
                                        window._isDragging = false;
                                    }, 100);
                                });
                            }
                        ");
                    }
                }
                catch (Exception exception)
                {
                    Debug.WriteLine($"WebView2初始化时发生错误: {exception}");
                }
            }
            else
            {
                MessageBox.Show($"WebView2 初始化失败: {e.InitializationException.Message}", "错误");
            }
        }
        private void CoreWebView2_ProcessFailed(object? sender, CoreWebView2ProcessFailedEventArgs e)
        {
            try
            {
                Application.Current.Dispatcher.Invoke(() =>
                {
                    MessageBox.Show($"WebView2进程失败: {e.ProcessFailedKind}", "错误");
                    // 可以在这里尝试重新加载WebView2
                    webView.Reload();
                });
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"处理WebView2进程失败时出错: {ex}");
            }
        }
        private void WebView_NavigationCompleted(object? sender, CoreWebView2NavigationCompletedEventArgs e)
        {
            if (!e.IsSuccess && !isDisposed)
            {
                Application.Current.Dispatcher.InvokeAsync(async () =>
                {
                    try
                    {
                        if (webView?.CoreWebView2 == null || isDisposed)
                        {
                            return;
                        }

                        Debug.WriteLine($"导航失败，错误状态: {e.WebErrorStatus}");

                        switch (e.WebErrorStatus)
                        {
                            case CoreWebView2WebErrorStatus.ConnectionAborted:
                                // 连接被中断，可能是加载时间过长
                                if (navigationRetryCount < MAX_RETRY_COUNT)
                                {
                                    navigationRetryCount++;
                                    Debug.WriteLine($"连接超时，正在进行第 {navigationRetryCount} 次重试...");

                                    // 使用异步延迟而不是阻塞线程
                                    await Task.Delay(2000 * navigationRetryCount);

                                    if (!isDisposed && webView?.CoreWebView2 != null)
                                    {
                                        // 使用带超时的导航
                                        await NavigateWithTimeoutAsync(webView.Source.ToString());
                                    }
                                }
                                else
                                {
                                    MessageBox.Show("页面加载超时，请检查网络连接或稍后重试", "提示");
                                    navigationRetryCount = 0;
                                }

                                break;

                            case CoreWebView2WebErrorStatus.Unknown:
                                // 资源未找到
                                MessageBox.Show("请求的页面不存在", "错误");
                                webView.Source = new Uri("about:blank");
                                break;

                            case CoreWebView2WebErrorStatus.HostNameNotResolved:
                                // DNS解析失败
                                MessageBox.Show("无法解析域名，请检查网络连接或URL是否正确", "错误");
                                break;

                            case CoreWebView2WebErrorStatus.CannotConnect:
                                // 网络断开
                                MessageBox.Show("网络已断开，请检查网络连接", "错误");
                                break;

                            default:
                                // 其他错误，尝试重试
                                if (navigationRetryCount < MAX_RETRY_COUNT)
                                {
                                    navigationRetryCount++;
                                    Debug.WriteLine($"导航失败，正在进行第 {navigationRetryCount} 次重试...");
                                    Thread.Sleep(1000 * navigationRetryCount);
                                    if (!isDisposed && webView?.CoreWebView2 != null)
                                    {
                                        webView.Reload();
                                    }
                                }
                                else
                                {
                                    MessageBox.Show($"导航失败: {e.WebErrorStatus}\n已重试{MAX_RETRY_COUNT}次，请检查网络连接或URL是否正确",
                                        "错误");
                                    navigationRetryCount = 0;
                                }

                                break;
                        }
                    }
                    catch (Exception ex)
                    {
                        Debug.WriteLine($"处理导航失败时出错: {ex}");
                    }
                });
            }
            else
            {
                navigationRetryCount = 0;
            }
        }
        private void TaskScheduler_UnobservedTaskException(object? sender, UnobservedTaskExceptionEventArgs e)
        {
            Debug.WriteLine($"Task未观察到的异常: {e.Exception}");
            e.SetObserved();
        }
        private const int WM_NCLBUTTONDOWN = 0xA1;
        private const int HT_CAPTION = 0x2;
        private object loc = new object();
        private async Task ProcessMessageQueueAsync()
        {
            if (_isProcessingQueue) return;

            lock (_queueLock)
            {
                if (_isProcessingQueue) return;
                _isProcessingQueue = true;
            }

            try
            {
                while (true)  // 改为持续监听
                {
                    Action? message = null;
                    lock (_queueLock)
                    {
                        if (_messageQueue.Count > 0)
                        {
                            message = _messageQueue.Dequeue();
                        }
                        else
                        {
                            _isProcessingQueue = false;  // 队列为空时重置状态
                            break;  // 退出循环
                        }
                    }

                    if (message != null)
                    {
                        try
                        {
                            message.Invoke();
                            // 添加小延迟避免消息处理太快
                            await Task.Delay(10);
                        }
                        catch (Exception ex)
                        {
                            Debug.WriteLine($"处理消息时出错: {ex}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"消息队列处理出错: {ex}");
                lock (_queueLock)
                {
                    _isProcessingQueue = false;  // 确保在异常情况下也重置状态
                }
            }
        }
        private async void CoreWebView2_WebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            try
            {
                var message = JsonSerializer.Deserialize<IpcModel>(e.TryGetWebMessageAsString());

                if (message?.Type == "dragWindow")
                {

                    lock (loc)
                    {
                        Debug.WriteLine(DateTime.Now.ToString() + ":Moving");
                        Application.Current.Dispatcher.Invoke( () =>
                        {
                            try
                            {
                                // 使用时
                                bool success = false;
                                int error = 0;
                                success = ReleaseCapture();
                                Debug.WriteLine("ReleaseCapture");
                                if (!success)
                                {
                                    error = Marshal.GetLastWin32Error();
                                    Debug.WriteLine($"ReleaseCapture failed with error: {error}");
                                }
                                // SendMessage 返回 0 不一定表示失败
                                PostMessage(new WindowInteropHelper(this).Handle, WM_NCLBUTTONDOWN, HT_CAPTION, 0);
                                error = Marshal.GetLastWin32Error();
                                if (error != 0)
                                {
                                    Debug.WriteLine($"SendMessage failed with error: {error}");
                                }

                             
                            }
                            catch (Exception ex)
                            {
                                Debug.WriteLine($"Window drag operation failed: {ex}");
                            }
                        });
                        Debug.WriteLine(DateTime.Now.ToString() + ":Moved");
                    }

                }
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception);
            }
        }
        public void Dispose()
        {
            try
            {
                isDisposed = true;

                // 移除事件处理器
                KeyDown -= MainWindow_KeyDown;
                TaskScheduler.UnobservedTaskException -= TaskScheduler_UnobservedTaskException;

                if (webView?.CoreWebView2 != null)
                {
                    webView.CoreWebView2.ProcessFailed -= CoreWebView2_ProcessFailed;
                    webView.CoreWebView2.WebMessageReceived -= CoreWebView2_WebMessageReceived;
                }

                if (webView != null)
                {
                    webView.NavigationCompleted -= WebView_NavigationCompleted;
                    webView.CoreWebView2InitializationCompleted -= WebView_CoreWebView2InitializationCompleted;
                    webView.Dispose();
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Dispose时发生错误: {ex}");
            }
        }
        private async Task NavigateWithTimeoutAsync(string url)
        {
            try
            {
                if (_navigationCts != null)
                {
                    _navigationCts.Cancel();
                    _navigationCts.Dispose();
                }

                _navigationCts = new CancellationTokenSource();
                var completionSource = new TaskCompletionSource<bool>();

                void Handler(object? s, CoreWebView2NavigationCompletedEventArgs e)
                {
                    completionSource.TrySetResult(e.IsSuccess);
                }

                webView.NavigationCompleted += Handler;

                try
                {
                    webView.Source = new Uri(url);

                    using var timeoutCts = new CancellationTokenSource(NAVIGATION_TIMEOUT);
                    using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(
                        timeoutCts.Token, _navigationCts.Token);

                    // 等待导航完成或超时
                    var completedTask = await Task.WhenAny(
                        completionSource.Task,
                        Task.Delay(NAVIGATION_TIMEOUT, linkedCts.Token)
                    );

                    if (completedTask != completionSource.Task)
                    {
                        // 导航超时
                        Debug.WriteLine("导航超时");
                        webView.Stop();
                        // 可以在这里处理超时后的逻辑
                    }
                }
                finally
                {
                    webView.NavigationCompleted -= Handler;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"导航出错: {ex}");
            }
        }
        private void MainWindow_KeyDown(object sender, KeyEventArgs e)
        {
            // 检查是否按下 F12
            if (e.Key == Key.F12)
            {
                try
                {
                    // 打开开发者工具
                    webView?.CoreWebView2?.OpenDevToolsWindow();
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"打开开发者工具时出错: {ex}");
                }
            }
        }
    }
}