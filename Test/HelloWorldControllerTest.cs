using Xunit;
using Server.Controllers.HelloWorld;
using System.Net.Http;
using System.Threading.Tasks;

namespace test;

public class HelloWorldControllerTest : IClassFixture<ServerFixture>
{
    public HelloWorldControllerTest(ServerFixture apiFixture)
    {
        m_ServerFixture = apiFixture;
        m_Client = apiFixture.HttpClient;
    }

    [Fact]
    public async Task Get_ShouldReturn()
    {
        var response = await m_Client.GetAsync("/api/hello-world");

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadAsAsync<HelloWorld>();

        Assert.Equal("World", result.Hello);
    }

    private readonly ServerFixture m_ServerFixture;
    private readonly HttpClient m_Client;
}