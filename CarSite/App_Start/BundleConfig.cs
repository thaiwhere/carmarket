using System.Web;
using System.Web.Optimization;

namespace CarSite
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Clear();
            bundles.ResetAll();

            BundleTable.EnableOptimizations = true;

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
                      "~/Content/scripts/Index.js",
                      "~/Content/scripts/lib/bootstrap.min.js",
                //"~/Content/scripts/bootstrap-dropdownhover.js",
                      "~/Content/scripts/lib/respond.js",
                      "~/Content/scripts/grid.paging/*.js",
                      "~/Content/scripts/base/*.js",
                      "~/Content/scripts/fancybox/jquery.fancybox.pack.js"));

            bundles.Add(new ScriptBundle("~/bundles/add_car").Include(
                     "~/Content/scripts/AddCar.js"));

            bundles.Add(new ScriptBundle("~/bundles/edit_car").Include(                     
                     "~/Content/scripts/EditCar.js"));

            bundles.Add(new ScriptBundle("~/bundles/approve_del_car").Include(                     
                     "~/Content/scripts/DeleteCar.js",                     
                     "~/Content/scripts/ApproveCar.js"));

            bundles.Add(new ScriptBundle("~/bundles/searchingcar").Include(                                          
                     "~/Content/scripts/SearchingCar.js"));

            bundles.Add(new ScriptBundle("~/bundles/cardetail").Include(
                     "~/Content/scripts/CarDetail.js"));

            bundles.Add(new ScriptBundle("~/bundles/member").Include(
                     "~/Content/scripts/Login.js",
                     "~/Content/scripts/Contact.js",
                     "~/Content/scripts/Manage.js",
                     "~/Content/scripts/Register.js",
                     "~/Content/scripts/RecoverPass.js"));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/Css/base/*.css",
                      "~/Content/Css/MsgBox/*.css",
                      "~/Content/Css/grid.paging/PagerGrid.css",
                      "~/Content/Css/grid.paging/PagerPagination.css",
                      "~/Content/Css/grid.paging/PagerPagination2.css",
                      "~/Content/Css/bootstrap.min.css",
                      "~/Content/Css/bootstrap-dropdownhover.min.css",
                      "~/Content/Css/bootstrap.min.css",
                      "~/Content/scripts/fancybox/jquery.fancybox.css"
                //"~/Content/Css/justified-nav.css"
                      ));
        }
    }
}