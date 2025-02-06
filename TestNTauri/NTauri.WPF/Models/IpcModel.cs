using System.Text.Json;
using System.Text.Json.Serialization;

namespace NTauri.WPF.Models
{
    public class IpcModel
    {
        [JsonPropertyName("type")] public string Type { get; set; }
        [JsonPropertyName("message")] public string Message { get; set; }

        public T? TryGetWebMessageAsAny<T>()
        {
            return JsonSerializer.Deserialize<T>(Message);
        }
    }
}