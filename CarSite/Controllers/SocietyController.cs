using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CarSite.Controllers
{
    public class SocietyController : Controller
    {
        //
        // GET: /News/
        public ActionResult Index(int id)
        {
            return View("~/Views/Society/Society" + id + ".cshtml");
        }

        //
        // GET: /Page/
        public ActionResult Page(int id)
        {
            return View("~/Views/Home/Society/SocietyPage" + id + ".cshtml");
        }
	}
}