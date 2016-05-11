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
        
        public ActionResult CarDetail(int id = 1)
        {            
            var criteria = new CarSearchingDetalCriteria
            {
                CarId = id
            };

            CarViewModel carDetail = CarService.SearchingCarDetail(criteria);
            return View("~/Views/Car/CarDetail.cshtml", carDetail);
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
        public JsonResult SearchingCarsByFirmModel(CarSearchingFirmModelCriteria criteria)
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
        public JsonResult SearchingCarsNewOld(CarSearchingNewOldCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsImportDomestic(CarSearchingImportDomesticCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }        
                
        [HttpPost]
        public JsonResult SearchingCarsSimilarModel(CarSearchingSimilarModelCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsSimilarPrice(CarSearchingSimilarPriceCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }     

        #endregion
    }
}