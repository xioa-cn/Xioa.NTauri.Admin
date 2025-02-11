namespace TestNTauri.ViewModels;

public class ViewModelLocator {
    public static Dictionary<string, object> ViewModelsMethods = new Dictionary<string, object>();

    static ViewModelLocator() {
        InitializedComponents();
    }

    private static void InitializedComponents() {
        ViewModelsMethods.Add("loginService", new LoginService());
        ViewModelsMethods.Add("HeaderService", new HeaderViewModel());
    }
}