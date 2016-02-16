using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace CarSite.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string firm = "Acura";
            List<string> models = new List<string>();
            string xmlData = HttpContext.Server.MapPath("~/App_Data/Acura.xml");

            using (XmlReader reader = XmlReader.Create(xmlData))
            {

                reader.MoveToContent();
                while (reader.Read())
                {
                    if (reader.NodeType == XmlNodeType.Element
                        && reader.Name.Equals(firm))
                    {
                        while (reader.Read())
                        {
                            if (reader.NodeType == XmlNodeType.Element &&
                                reader.Name == "model")
                            {
                                models.Add(reader.ReadString());
                            }
                        }
                    }
                }
            }

            return View(models);
        }
       
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}