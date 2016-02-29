using CarModel.Criteria;
using CarModel.Entity;
using CarService;
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

        /// <summary>
        /// hay nay dung de tim kiem ra list car thoa d/k tim kiem, sau do se dc lay = jquery.Ajax de render ra web
        /// </summary>
        /// <param name="criteria"></param>
        /// <returns></returns>
        public JsonResult SearchingCars(CarSearchingCriteria criteria)
        {
            List<Car> listCar = CarSearchingService.CarSearching(criteria); //criteria : nghia la d/k tim kiem

            return Json(listCar); // result trong getListCar
        }
    }
}