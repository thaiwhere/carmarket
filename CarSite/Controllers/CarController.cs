using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace CarSite.Controllers
{
    public class CarController : Controller
    {       
        public ActionResult SearchingCar(string firm="", string model="")
        {
            return View();
        }

        public ActionResult CarDetail()
        {
            List<string> carDetail = new List<string>();
            return View(carDetail);
        }
    }
}