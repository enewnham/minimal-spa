namespace Server;

using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

using Server.Data;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddRazorPages();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new() { Title = "api", Version = "v1" });
        });
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(@"Data Source=(LocalDb)\minimal;Initial Catalog=dbo");
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseDeveloperExceptionPage();
        app.UseHsts();

        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "api v1"));

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapRazorPages();

            endpoints.MapFallbackToPage(@"{**path:regex(^(?!api\b).+)}", "/app");
            endpoints.MapFallbackToPage("", "/app");
        });
    }
}