using Car.Model.Criteria;
using Car.Model.Entity;
using Car.Service;
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
        #region GET Methods

        public ActionResult SearchingCars(string firm="", string model="")
        {                                 
            CarSearchingFirmModelCriteria criteria = new CarSearchingFirmModelCriteria
            {
                FirmName = firm,
                Model = model
            };
            
            return View("~/Views/Car/SearchingCar.cshtml", criteria);
        }        
    
        public ActionResult CarDetail()
        {
            List<string> carDetail = new List<string>();
            return View(carDetail);
        }

        #endregion

        #region POST Methods

        [HttpPost]
        public JsonResult SearchingCars(CarSearchingCriteria criteria)
        {            
            var listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsForYou(CarSearchingForYouCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingNewCars(CarSearchingNewImportCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingOldCars(CarSearchingNewImportCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingImportCars(CarSearchingNewImportCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingDomesticCars(CarSearchingNewImportCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }
        
        #endregion
    }
}