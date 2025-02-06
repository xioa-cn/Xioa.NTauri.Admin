using System.Windows;
using NTauri.WPF.Models;
using NTauri.WPF.Window;
using TestNTauri.ViewModels;

namespace TestNTauri
{
    public class AppConfig
    {
        public static string VueProjectPath => "VueDemo/vue-project";
        public static int VueDevServerPort => 3000;
    }

    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        static App()
        {
        }

        public static AppWindowsWebView WebView { get; private set; }
        protected override async void OnStartup(StartupEventArgs e) {
            WebView = new AppWindowsWebView();
            await WebView.StartupVueServer(
                AppConfig.VueProjectPath, StartupMode.DevServer, AppConfig.VueDevServerPort);
            //TestViewModel vm = new TestViewModel();
            
            base.OnStartup(e);
        }
    }
}