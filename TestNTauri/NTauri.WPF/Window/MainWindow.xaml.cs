using System.Text.Json;
using System.Windows;
using Microsoft.Web.WebView2.Core;
using NTauri.WPF.Models;
using NTauri.WPF.TauriServer;

namespace NTauri.WPF.Window
{
    public partial class MainWindow : System.Windows.Window, IDisposable
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void WebView_CoreWebView2InitializationCompleted(object? sender,
            CoreWebView2InitializationCompletedEventArgs e)
        {
            if (e.IsSuccess)
            {
                // 注入 JavaScript 代码
                webView.CoreWebView2.AddScriptToExecuteOnDocumentCreatedAsync(
                    "window.chrome.webview.postMessage(message => console.log(message));");
            }
            else
            {
                MessageBox.Show("WebView2 初始化失败: " + e.InitializationException.Message);
            }
        }
        public void Dispose()
        {
            webView.Dispose();
        }

        private async void Send(object sender, RoutedEventArgs e) {
            Random r = new Random();
            var message = new WebMessage
            {
                Type = "message",
                Data = r.Next(0,1000)
            };

            // 序列化消息
            string json = JsonSerializer.Serialize(message);
            // 发送到 Vue 应用
            await webView.ExecuteScriptAsync($"window.postMessage({json}, '*')");
            
        }
    }
}