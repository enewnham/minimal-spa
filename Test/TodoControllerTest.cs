using Xunit;
using Server.Controllers.Todo;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using FluentAssertions;

namespace test;

public class TodoControllerTest : IClassFixture<ServerFixture>, IAsyncLifetime
{
    public TodoControllerTest(ServerFixture apiFixture)
    {
        m_ServerFixture = apiFixture;

        m_Scope = m_ServerFixture.Services.CreateScope();
        m_Context = m_Scope.ServiceProvider.GetRequiredService<AppDbContext>();

        m_Client = apiFixture.HttpClient;
    }

    public async Task InitializeAsync()
    {
        await m_Context.Database.ExecuteSqlRawAsync("TRUNCATE TABLE TodoEntries");

        m_Context.AddRange(m_Entries);

        await m_Context.SaveChangesAsync();
    }

    public async Task DisposeAsync()
    {
        await m_Context.DisposeAsync();
        m_Scope.Dispose();
    }


    [Fact]
    public async Task Get_ShouldReturn()
    {
        var response = await m_Client.GetAsync("/api/todos");

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadAsAsync<List<Entry>>();

        result.Should().BeEquivalentTo(m_Entries);
    }

    [Fact]
    public async Task GetId_ShouldReturn()
    {
        var response = await m_Client.GetAsync("/api/todos/1");

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadAsAsync<Entry>();

        result.Should().BeEquivalentTo(m_Entries[0]);
    }

    [Fact]
    public async Task ToggleComplete_ShouldToggle()
    {
        var response = await m_Client.PutAsync("/api/todos/1/complete", null);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadAsAsync<Entry>();

        var entry = m_Entries[0];
        entry.Complete = !entry.Complete;

        result.Should().BeEquivalentTo(entry);
    }

    [Fact]
    public async Task Add_ShouldReturn()
    {
        var entry = new Entry("New")
        {
            Complete = false,
        };
        var response = await m_Client.PostAsJsonAsync("/api/todos", entry);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadAsAsync<Entry>();
        entry.Id = result.Id;

        result.Should().BeEquivalentTo(entry);
    }

    private readonly List<Entry> m_Entries = new()
    {
        new Entry("Incomplete")
        {
            Complete = false,
        },
        new Entry("Complete")
        {
            Complete = true,
        },
    };
    private readonly ServerFixture m_ServerFixture;
    private readonly IServiceScope m_Scope;
    private readonly AppDbContext m_Context;
    private readonly HttpClient m_Client;
}