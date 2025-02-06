using System.Text.Json;
using NTauri.WPF.Models;

namespace NTauri.WPF.TauriServer
{
    public static class WebViewExtensions
    {
        public static async Task SendMessageAsync<T>(this IWebView webView, string type, T data)
        {
            var message = new WebMessage
            {
                Type = type,
                Data = data
            };

            // 序列化消息
            string json = JsonSerializer.Serialize(message);
            // 发送到 Vue 应用
            await webView.ExecuteScriptAsync($"window.postMessage({json}, '*')");
        }
    }
}