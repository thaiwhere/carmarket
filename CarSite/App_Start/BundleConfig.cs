using System.Web;
using System.Web.Optimization;

namespace CarSite
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/Scripts/lib/jquery/jquery-{version}.js",
                        "~/Content/Scripts/lib/jquery/jquery.min.js",
                        "~/Content/Scripts/lib/jquery/jquery.extensions.js",
                        "~/Content/Scripts/lib/jquery/jquery.msgbox-0.0.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(                        
                        "~/Content/Scripts/lib/jquery/jquery.validate.min.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Content/Scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(                      
                      "~/Content/Scripts/lib/bootstrap.min.js",
                      //"~/Content/Scripts/bootstrap-dropdownhover.js",
                      "~/Content/Scripts/lib/respond.js",
                      "~/Content/Scripts/grid.paging/*.js",
                      "~/Content/Scripts/base/*.js"));                    

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/Css/base/*.css",
                      "~/Content/Css/grid.paging/PagerGrid.css",
                      "~/Content/Css/grid.paging/PagerPagination.css",
                      "~/Content/Css/bootstrap.min.css",
                      "~/Content/Css/bootstrap-dropdownhover.min.css",                      
                      "~/Content/Css/justified-nav.css"                      
                      ));
        }
    }
}

