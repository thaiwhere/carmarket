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
                        "~/Content/scripts/lib/jquery/jquery-1.9.1.min.js",
                        "~/Content/scripts/lib/jquery/jquery-ui-1.9.2.min.js",
                        "~/Content/scripts/lib/jquery/jquery.extensions.js",
                        "~/Content/scripts/lib/jquery/jquery.msgbox-0.0.1.js",
                        "~/Content/scripts/lib/jquery/jquery.cookie.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(                        
                        "~/Content/scripts/lib/jquery/jquery.validate.min.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Content/scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(                      
                      "~/Content/scripts/lib/bootstrap.min.js",
                      //"~/Content/scripts/bootstrap-dropdownhover.js",
                      "~/Content/scripts/lib/respond.js",
                      "~/Content/scripts/grid.paging/*.js",
                      "~/Content/scripts/base/*.js"));                    

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/Css/base/*.css",
                      "~/Content/Css/grid.paging/PagerGrid.css",
                      "~/Content/Css/grid.paging/PagerPagination.css",
                      "~/Content/Css/grid.paging/PagerPagination2.css",
                      "~/Content/Css/bootstrap.min.css",
                      "~/Content/Css/bootstrap-dropdownhover.min.css"//,                      
                      //"~/Content/Css/justified-nav.css"                      
                      ));
        }
    }
}

