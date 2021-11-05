
namespace Server.Controllers.Todo;

public class Entry
{
    public Entry(string value)
    {
        Value = value;
    }

    public int Id { get; set; }

    public string Value { get; set; }

    public bool Complete { get; set; }
}