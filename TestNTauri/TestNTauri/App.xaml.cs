using System.Windows;
using NTauri.WPF.Models;
using NTauri.WPF.Window;
using TestNTauri.Services;
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
            //new DeepSeekService();
            // 设置全局异常处理
            AppDomain.CurrentDomain.UnhandledException += (s, args) =>
            {
                Console.WriteLine(args.ExceptionObject.ToString());
            };

            Current.DispatcherUnhandledException += (s, args) =>
            {
                Console.WriteLine(args.Exception.ToString());
                //args.Handled = true;
            };
            
            WebView = new AppWindowsWebView();
            await WebView.StartupVueServer(
                AppConfig.VueProjectPath, StartupMode.DevServer, AppConfig.VueDevServerPort,
                ViewModelLocator.ViewModelsMethods,false);
            
            base.OnStartup(e);
        }
    }
}