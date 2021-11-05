using System;
using System.Net.Http;

public class ServerFixture : IDisposable
{
    public ServerFixture()
    {
    }

    public void Dispose()
    {
        m_ServerFactory.Dispose();
    }

    public HttpClient HttpClient => m_ServerFactory.CreateClient();

    public IServiceProvider Services => m_ServerFactory.Services;

    private ServerFactory<Server.Startup> m_ServerFactory = new();
}