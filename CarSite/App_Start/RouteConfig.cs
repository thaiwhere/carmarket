using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CarSite
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.Add("CarDetail", new SeoFriendlyRoute("car/detail/{id}",
            new RouteValueDictionary(new { controller = "Car", action = "Detail" }),
            new MvcRouteHandler()));

            routes.Add("CarHireDetail", new SeoFriendlyRoute("car/hiredetail/{id}",
            new RouteValueDictionary(new { controller = "Car", action = "HireDetail" }),
            new MvcRouteHandler()));

            routes.Add("News", new SeoFriendlyRoute("news/{id}",
            new RouteValueDictionary(new { controller = "News", action = "Index" }),
            new MvcRouteHandler()));

            routes.MapRoute(
                name: "SearchingModel",
                url: "model/{firm}/{model}",
                defaults: new { controller = "Car", action = "Model", firm = UrlParameter.Optional, model = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "SearchingFirm",
                url: "firm/{firm}/{province}",
                defaults: new { controller = "Car", action = "Firm", firm = UrlParameter.Optional, province = UrlParameter.Optional }
            );            

            routes.MapRoute(
                name: "Home",
                url: "home",
                defaults: new { controller = "Home", action = "Index" }
            );
            
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

           
        }
    }
}
