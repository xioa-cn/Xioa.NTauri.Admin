﻿using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;
using NTauri.WPF.Models;

namespace NTauri.WPF.TauriServer {
    public class WindowsWebView : IWebView {
        private WebView2 _webView;

        public event EventHandler<IpcModel?>? WebMessageReceived;

        public WindowsWebView(WebView2 webView) {
            _webView = webView;
        }

        public Dictionary<string, object>? WebviewMethods { get; set; }

        public async Task InitializeAsync() {
            await _webView.EnsureCoreWebView2Async();
            if (WebviewMethods != null)
                foreach (var itMethod in WebviewMethods)
                {
                    _webView.CoreWebView2.AddHostObjectToScript(itMethod.Key, itMethod.Value);
                }

            _webView.CoreWebView2.WebMessageReceived += (s, e) =>
            {
                try
                {
                    var model = System.Text.Json.JsonSerializer.Deserialize<IpcModel>(e.TryGetWebMessageAsString());
                    WebMessageReceived?.Invoke(this, model);
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                }
            };
        }

        public Task LoadUrlAsync(string url) {
            _webView.CoreWebView2.Navigate(url);
            return Task.CompletedTask;
        }

        public Task LoadHtmlAsync(string html) {
            _webView.CoreWebView2.NavigateToString(html);
            return Task.CompletedTask;
        }

        public Task ExecuteScriptAsync(string script) {
            return _webView.CoreWebView2.ExecuteScriptAsync(script);
        }
    }
}