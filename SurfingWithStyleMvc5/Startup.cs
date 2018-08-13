using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SurfingWithStyleMvc5.Startup))]
namespace SurfingWithStyleMvc5
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
