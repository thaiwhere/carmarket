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
            //truong hop nay minh chi can xai 2 tham so {firm, model}

            CarSearchingCriteria criteria = new CarSearchingCriteria
            {
                FirmName = firm,
                Model = model
            };

            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList();

            ViewBag.SearchingType = "1";
            ViewBag.SearchingMessage = "Kết quả tìm kiếm : " + listCars.Count() +" xe";

            return View("~/Views/Car/SearchingCar.cshtml", listCars);
        }
        
        public ActionResult SearchingNewCars()
        {
            CarSearchingCriteria criteria = new CarSearchingCriteria
            {
                IsNew = true
            };

            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList();

            ViewBag.SearchingType = "2";
            ViewBag.SearchingMessage = "Danh sách xe mới" + listCars.Count() +" xe";

            return View("~/Views/Car/SearchingCar.cshtml", listCars);
        }

        public ActionResult SearchingOldCars()
        {            
            CarSearchingCriteria criteria = new CarSearchingCriteria
            {
                IsNew = false
            };

            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList();

            ViewBag.SearchingType = "3";
            ViewBag.SearchingMessage = "Danh sách xe cũ" + listCars.Count() +" xe";

            return View("~/Views/Car/SearchingCar.cshtml", listCars);
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
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsForYou(CarSearchingForYouCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars(criteria).ToList<CarModel>();
            return Json(listCars);
        }
        
        #endregion
    }
}