using System.Windows;
using NTauri.WPF.TauriServer;

namespace TestNTauri.ViewModels;

public class TestViewModel {
    public TestViewModel() {
        Task.Factory.StartNew(Test);
    }

    private void Test() {
        Random r = new Random();
        while (true)
        {
            Application.Current.Dispatcher.Invoke(() =>
            {
                App.WebView.WindowsWebView.SendMessageAsync("GET", r.Next(0,1000));
            });
            
            Thread.Sleep(1);
        }
    }
}