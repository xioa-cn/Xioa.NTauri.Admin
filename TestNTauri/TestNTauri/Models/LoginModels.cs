using System.Runtime.InteropServices;
using System.Text.Json.Serialization;

namespace TestNTauri.Models;

[ComVisible(true)]
public class LoginParams {
    [JsonPropertyName("username")] public string UserName { get; set; }
    [JsonPropertyName("password")] public string Password { get; set; }
}

[ComVisible(true)]
public class LoginResult {
    [JsonPropertyName("success")] public bool Success { get; set; }
    [JsonPropertyName("message")] public string Message { get; set; }
    [JsonPropertyName("token")] public string? Token { get; set; }
}

[ComVisible(true)]
public class RegisterResult : LoginResult {
}

[ComVisible(true)]
public class RegisterParams : LoginParams {
    [JsonPropertyName("email")] public string Email { get; set; }
}