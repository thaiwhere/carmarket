using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CarSite.Startup))]
namespace CarSite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
