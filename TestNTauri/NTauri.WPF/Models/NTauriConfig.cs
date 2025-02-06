namespace NTauri.WPF.Models
{
    public class NTauriConfigModel
    {
        public string VueProjectPath { get; set; }
        public int VueDevServerPort { get; set; } = 3000;
        public StartupMode? StartupMode { get; set; } = Models.StartupMode.DevServer;
    }
}