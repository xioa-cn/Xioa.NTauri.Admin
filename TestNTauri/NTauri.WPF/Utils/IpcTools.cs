using NTauri.WPF.Models;
using NTauri.WPF.Window;

namespace NTauri.WPF.Utils
{
    public static class IpcTools
    {
        public static void OpenListenServer(this AppWindowsWebView appWindowsWebView, Action<object?, IpcModel?> webMessageReceived)
        {
            if (appWindowsWebView.WindowsWebView is null)
                throw new NullReferenceException();
            appWindowsWebView.WindowsWebView.WebMessageReceived += ((sender, model) =>
            {
                webMessageReceived?.Invoke(sender, model);
            });
        }
    }
}