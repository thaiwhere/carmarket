using Car.Model.Criteria;
using Car.Model.Entity;
using Car.Service;
using System;
using System.Collections.Generic;
using System.IO;
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

        public ActionResult UploadFiles()
        {
            return View("~/Views/Shared/UploadFiles.cshtml");
        }

        [Authorize]
        public ActionResult Insert()
        {
            if (HttpContext.Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            return View("~/Views/Car/CarInsert.cshtml");
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

        [HttpPost]
        public JsonResult InsertCar(CarInsertEntity carInsertEntity)
        {            
            if (HttpContext.Session["UserId"] == null)
            {
                return Json(-1);
            }

            var criteria = new CarInsertCriteria
            {
                UserId = int.Parse(HttpContext.Session["UserId"].ToString()),
                Title = carInsertEntity.Title,
                Firm = carInsertEntity.Firm,
                Model = carInsertEntity.Model,
                IsNew = carInsertEntity.IsNew,
                IsImport = carInsertEntity.IsImport,
                TypeId = carInsertEntity.TypeId,
                CurrencyVN = carInsertEntity.CurrencyVN,
                Year = carInsertEntity.Year,
                Km = carInsertEntity.Km,
                Description = carInsertEntity.Description,
                ProvinceId = carInsertEntity.ProvinceId,
                SeatNo = carInsertEntity.SeatNo,
                GateNo = carInsertEntity.GateNo,
                ExteriorColorId = carInsertEntity.ExteriorColorId,
                InteriorColorId = carInsertEntity.InteriorColorId,
                FuelConsumption = carInsertEntity.FuelConsumption,
                FuelId = carInsertEntity.FuelId,
                FuelSystem = carInsertEntity.FuelSystem,
                GearBox = carInsertEntity.GearBox,
                WheelDriveId =carInsertEntity.WheelDriveId,
                CreatedDate = DateTime.Now.ToShortDateString()
            };

            var carId = CarService.InsertCar(criteria);

            if (carId == -1)
            {
                RemoveFolderName();                
            }
            else
            {
                ChangeFolderName(carId);
                ChangeFileName(carId);
            }

            return Json(carId);
        }        

        #endregion

        #region Utilities

        private void RemoveFolderName()
        {
            var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

            string sourceDirName = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString());

            bool isExists = System.IO.Directory.Exists(sourceDirName);
            if (isExists)
            {
                System.IO.Directory.Delete(sourceDirName);
            }
        }

        private void ChangeFolderName(int carId)
        {
            var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

            string sourceDirName = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString());

            string destDirName = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString() + "_" + carId);

            bool isExists = System.IO.Directory.Exists(sourceDirName);
            if (isExists)
            {
                System.IO.Directory.Move(sourceDirName, destDirName);
            }
        }

        private void ChangeFileName(int carId)
        {
            var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

            string destDirName = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString() + "_" + carId);

            bool isExists = System.IO.Directory.Exists(destDirName);
            if (isExists)
            {
                var index = 1;
                foreach(var file in System.IO.Directory.EnumerateFiles(destDirName))
                {                    
                    var destinationFilename = string.Format("{0}\\{1}", destDirName, index + ".jpg");

                    if (System.IO.File.Exists(destinationFilename))
                    {
                        System.IO.File.Delete(destinationFilename);
                    }

                    System.IO.File.Move(file, destinationFilename);

                    index++;
                }
            }

        }

        #endregion
    }
}