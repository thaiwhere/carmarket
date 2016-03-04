using Car.Model.Criteria;
using Car.Model.Entity;
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
            SearchingType obj = new SearchingType();
            obj.type = 1;            

            return View("~/Views/Car/SearchingCar.cshtml", obj);
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
            List<CarModel> listCar = CarSearchingService.SearchingCars(criteria); //criteria : nghia la d/k tim kiem

            return Json(listCar); // result trong getListCar
        }

        public ActionResult SearchingNewCar(CarSearchingCriteria criteria)
        {
            SearchingType obj = new SearchingType();
            obj.type = 2;

            return View("~/Views/Car/SearchingCar.cshtml", obj);
        }

        
        public ActionResult SearchingOldCar(CarSearchingCriteria criteria)
        {
            SearchingType obj = new SearchingType();
            obj.type = 3;

            return View("~/Views/Car/SearchingCar.cshtml", obj);
        }
    }
}