using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace CarMarketSite.Controllers
{
    public class CarController : Controller
    {
        public ActionResult CarFirm(string firm, string model)
        {
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
    }
}