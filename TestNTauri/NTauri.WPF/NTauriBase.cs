using NTauri.WPF.Models;

namespace NTauri.WPF
{
    public interface IWebView
    {
        /// <summary>
        /// 初始化 WebView 组件
        /// </summary>
        /// <returns>表示异步操作的 Task</returns>
        Task InitializeAsync();

        /// <summary>
        /// 加载指定 URL 的网页内容
        /// </summary>
        /// <param name="url">要加载的网页 URL</param>
        /// <returns>表示异步操作的 Task</returns>
        Task LoadUrlAsync(string url);

        /// <summary>
        /// 加载 HTML 字符串内容
        /// </summary>
        /// <param name="html">要加载的 HTML 字符串</param>
        /// <returns>表示异步操作的 Task</returns>
        Task LoadHtmlAsync(string html);

        /// <summary>
        /// 在 WebView 中执行 JavaScript 代码
        /// </summary>
        /// <param name="script">要执行的 JavaScript 代码</param>
        /// <returns>表示异步操作的 Task</returns>
        Task ExecuteScriptAsync(string script);

        /// <summary>
        /// 当从 Web 页面接收到消息时触发的事件
        /// </summary>
        /// <remarks>
        /// 该事件用于实现 Web 页面和本地代码之间的通信。
        /// 当 Web 页面调用特定的 JavaScript 方法时，会触发此事件。
        /// </remarks>
        event EventHandler<IpcModel?>? WebMessageReceived;
    }
}