using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Server.Data;

namespace Server.Controllers.Todo;

[ApiController]
[Route("api/todos")]
public class TodoController : ControllerBase
{
    public TodoController(AppDbContext context)
    {
        m_Context = context;
    }
    [HttpGet]
    public IQueryable<Entry> Get() => m_Context.TodoEntries.AsQueryable();

    [HttpGet("{id}")]
    public ValueTask<Entry> Get(int id) => m_Context.TodoEntries.FindAsync(id);

    [HttpPut("{id}/complete")]
    public async Task<Entry> ToggleComplete(int id)
    {
        var entry = await m_Context.TodoEntries.FindAsync(id);
        entry.Complete = !entry.Complete;

        await m_Context.SaveChangesAsync();

        return entry;
    }

    [HttpPost]
    public async Task<Entry> Add(Entry entry)
    {
        entry.Complete = false;
        m_Context.TodoEntries.Add(entry);

        await m_Context.SaveChangesAsync();

        return entry;
    }

    [HttpDelete]
    public async Task<IQueryable<Entry>> RemoveComplete()
    {
        var complete = await m_Context.TodoEntries.Where(e => e.Complete).ToListAsync();

        foreach (var e in complete)
            m_Context.TodoEntries.Remove(e);

        m_Context.SaveChanges();

        return m_Context.TodoEntries.AsQueryable();
    }

    private readonly AppDbContext m_Context;
}