using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CarMarketSite.Startup))]
namespace CarMarketSite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
