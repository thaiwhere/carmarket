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
                        "~/Content/Scripts/jquery-{version}.js",
                        "~/Content/Scripts/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Content/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Content/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(                      
                      /*"~/Content/Scripts/bootstrap.js",
                      "~/Content/Scripts/bootstrap-dropdownhover.js",                      */
                      "~/Content/Scripts/respond.js",
                      "~/Content/Scripts/common.js"));                    

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/Css/base/*.css",
                      "~/Content/Css/bootstrap.css",
                      "~/Content/Css/bootstrap-dropdownhover.min.css",                      
                      "~/Content/Css/justified-nav.css"                      
                      ));
        }
    }
}
