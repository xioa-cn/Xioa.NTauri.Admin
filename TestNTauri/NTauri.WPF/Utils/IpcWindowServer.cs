using NTauri.WPF.TauriServer;

namespace NTauri.WPF.Utils
{
    public static class IpcWindowServer
    {
        public static void AddListenerWindow(this IWebView webView, System.Windows.Window window)
        {
            webView.WebMessageReceived += (sender, model) =>
            {
                if (model is null)
                    return;
                if (model.Type == "maxWindow")
                {
                    window.WindowState = System.Windows.WindowState.Maximized;
                }

                else if (model.Type == "minWindow")
                {
                    window.WindowState = System.Windows.WindowState.Minimized;
                }

                else if (model.Type == "normalWindow")
                {
                    window.WindowState = System.Windows.WindowState.Normal;
                }

                else if (model.Type == "closeWindow")
                {
                    window.Close();
                }
            };
        }
    }
}