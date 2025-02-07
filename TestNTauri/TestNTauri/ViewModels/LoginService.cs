using System.Runtime.InteropServices;
using TestNTauri.Models;

namespace TestNTauri.ViewModels;

[ComVisible(true)]
[ClassInterface(ClassInterfaceType.AutoDual)]
public class LoginService {
    public LoginResult Login(string loginParams) {
        var loginUser = System.Text.Json.JsonSerializer.Deserialize<LoginParams>(loginParams);
        return new LoginResult() {
            Success = true,
            Message = "Login successful"
        };
    }

    public RegisterResult Register(string registerParams) {
        var loginUser = System.Text.Json.JsonSerializer.Deserialize<RegisterParams>(registerParams);
        return new RegisterResult() {
            Success = true,
            Message = "Register successful"
        };
    }
}