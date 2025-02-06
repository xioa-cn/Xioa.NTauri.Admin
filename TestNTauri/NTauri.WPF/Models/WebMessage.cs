namespace NTauri.WPF.Models
{
    /// <summary>
    /// 定义消息结构
    /// </summary>
    public class WebMessage
    {
        public string Type { get; set; }
        public object Data { get; set; }
    }
}