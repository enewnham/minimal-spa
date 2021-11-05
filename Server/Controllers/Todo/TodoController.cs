using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers.Todo;

[ApiController]
[Route("api/todos")]
public class TodoController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Entry>> Get() => ms_Entries.Values.ToList();

    [HttpGet("{id}")]
    public ActionResult<Entry> Get(int id) => ms_Entries[id];

    [HttpPut("{id}/complete")]
    public ActionResult<Entry> ToggleComplete(int id)
    {
        var entry = ms_Entries[id];
        entry.Complete = !entry.Complete;

        return entry;
    }

    [HttpPost]
    public ActionResult<Entry> Add(Entry entry)
    {
        entry.Id = ms_Entries.Any() ? ms_Entries.Values.Max(e => e.Id) + 1 : 0;
        entry.Complete = false;

        ms_Entries.Add(entry.Id, entry);

        return entry;
    }

    [HttpDelete]
    public ActionResult<List<Entry>> RemoveComplete()
    {
        var complete = ms_Entries.Values.Where(e => e.Complete).ToList();

        foreach (var e in complete)
            ms_Entries.Remove(e.Id);

        return ms_Entries.Values.ToList();
    }

    private static Dictionary<int, Entry> ms_Entries = new();
}