
using Server.Controllers.Todo;
using Microsoft.EntityFrameworkCore;

namespace Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Entry> TodoEntries { get; set; } = null!;
}