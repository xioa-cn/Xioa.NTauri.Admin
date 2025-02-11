using System.ClientModel;
using System.Security.Policy;
using OpenAI;
using OpenAI.Chat;

namespace TestNTauri.Services;

public class DeepSeekService {
    private readonly ChatClient client;

    public DeepSeekService() {
        ApiKeyCredential key = new ApiKeyCredential("sk-57c8daaa797f4ef390d48af28cf84d33");
        OpenAIClientOptions options = new OpenAIClientOptions();
        options.Endpoint = new Uri("https://api.deepseek.com");
        client = new ChatClient(
            "deepseek-chat",
            key,
            options);
        try
        {
            ChatCompletion completion = client.CompleteChat("Say 'this is a test.'");
            Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private async Task RequestDp() {
      
    }
}