using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers.HelloWorld;

[ApiController]
[Route("api/hello-world")]
public class HelloWorldController : ControllerBase
{
    [HttpGet]
    public ActionResult<HelloWorld> Get()
    {
        return new HelloWorld();
    }
}