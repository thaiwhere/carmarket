using Car.Framework;
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

        private static string approvalWaitting = "Tin đăng cuả Bạn đã sẽ đuợc duyệt trong vòng 24h";
        #region GET Methods

        public ActionResult SearchingCars(string firm = "", string model = "", string province = "")
        {
            CarSearchingFirmModelProvinceCriteria criteria = new CarSearchingFirmModelProvinceCriteria
            {
                FirmName = firm,
                Model = model,
                Province = province
            };
            
            return View("~/Views/Car/SearchingCar.cshtml", criteria);
        }
        
        public ActionResult CarDetail(int id = 0)
        {            
            var criteria = new CarSearchingDetalCriteria
            {
                CarId = id,
                UserId = HttpContext.Session["UserId"] != null ? int.Parse(HttpContext.Session["UserId"].ToString()) : 0
            };
           
            CarViewModel carDetail = CarService.SearchingCarDetail(criteria, AppSettings.IsGetFromCache);
            if (carDetail != null)
            {
                return View("~/Views/Car/CarDetail.cshtml", carDetail);
            }
            else
            {
                return View("~/Views/Car/CarNoDetail.cshtml");
            }
        }

        public ActionResult CarBuyDetail(int id = 0)
        {
            var criteria = new CarBuySearchingDetailCriteria
            {
                CarId = id,
                UserId = HttpContext.Session["UserId"] != null ? int.Parse(HttpContext.Session["UserId"].ToString()) : 0
            };
           
            CarViewModel carDetail = CarService.SearchingCarDetail(criteria, AppSettings.IsGetFromCache);
            if (carDetail != null)
            {
                return View("~/Views/Car/CarBuyDetail.cshtml", carDetail);
            }
            else
            {
                return View("~/Views/Car/CarNoDetail.cshtml");
            }
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
                return RedirectToAction("Login", "Account", new { returnUrl = "/Car/Insert" });
            }

            return View("~/Views/Car/CarInsert.cshtml");
        }

        [Authorize]
        public ActionResult Edit(int id = 0)
        {
            if (HttpContext.Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account", new { returnUrl = "/Car/Edit" });
            }

            var criteria = new CarGettingForEditCriteria
            {
                CarId = id,
                UserId = int.Parse(HttpContext.Session["UserId"].ToString())
            };

            var carInfo = CarService.GetCarEditInfo(criteria);            

            if (carInfo != null)
            {
                carInfo.Images = this.GetListImages(id);
                return View("~/Views/Car/CarEdit.cshtml", carInfo);
            }
            else
            {
                return View("~/Views/Car/CarEditNoPermission.cshtml");
            }
        }

        [Authorize]
        public ActionResult EditCarBuying(int id = 0)
        {
            if (HttpContext.Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account", new { returnUrl = "/Car/EditCarBuying" });
            }

            var criteria = new CarBuyingGettingForEditCriteria
            {
                CarId = id,
                UserId = int.Parse(HttpContext.Session["UserId"].ToString())
            };

            var carInfo = CarService.GetCarBuyEditInfo(criteria);            

            if (carInfo != null)
            {
                return View("~/Views/Car/CarBuyingEdit.cshtml", carInfo);
            }
            else
            {
                return View("~/Views/Car/CarNoDetail.cshtml");
            }
        }

        [Authorize]
        public ActionResult Yours()
        {
            if (HttpContext.Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account");
            }

            if(HttpContext.Session["IsAdmin"] != null && bool.Parse(HttpContext.Session["IsAdmin"].ToString()) == true)
            {
                ViewBag.IsAdmin = true;
            }
            else
            {
                ViewBag.IsAdmin = false;
            }

            return View("~/Views/Car/Yours.cshtml");
        }
        
        public ActionResult CarOfUser(int id = 0)
        {
            ViewBag.UserId = id;
            return View("~/Views/Car/SearchingCarOfUser.cshtml");
        }


        [Authorize]
        public ActionResult Buy()
        {
            if (HttpContext.Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account");
            }

            return View("~/Views/Car/CarBuyingInsert.cshtml");
        }

        public ActionResult CarForBuy()
        {           
            return View("~/Views/Car/CarForBuy.cshtml");
        }        
        

        #endregion

        #region POST Methods

        [HttpPost]
        public JsonResult SearchingCars(CarSearchingCriteria criteria)
        {
            var listCars = CarService.SearchingCars<CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsByFirmModelProvince(CarSearchingFirmModelCriteria criteria)
        {
            var listCars = CarService.SearchingCars<CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsForYou(CarSearchingForYouCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars <CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsNewOld(CarSearchingNewOldCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars<CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsImportDomestic(CarSearchingImportDomesticCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars<CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            return Json(listCars);
        }        
                
        [HttpPost]
        public JsonResult SearchingCarsSimilarModel(CarSearchingSimilarModelCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars<CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult SearchingCarsSimilarPrice(CarSearchingSimilarPriceCriteria criteria)
        {
            List<CarModel> listCars = CarService.SearchingCars<CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            return Json(listCars);
        }

        [HttpPost]
        public JsonResult InsertCar(CarInsertEntity carInsertEntity)
        {
            var carId = 0;

            try
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
                    WheelDriveId = carInsertEntity.WheelDriveId,
                    CreatedDate = DateTime.Now.ToShortDateString()
                };

                carId = CarService.InsertCar(criteria);

                if (carId > 0)
                {
                    ChangeFolderName(carId);
                    ChangeFileName(carId);

                    var contact = new Contact { Name = HttpContext.Session["UserName"].ToString(), Email = HttpContext.Session["Email"].ToString() };
                    Proxy.SendEmail(contact, "Thông báo đăng tin", "Bạn đã đăng tin với tiêu đề <br /> <br />" + carInsertEntity.Title + "<br /> <br />" + approvalWaitting);
                }
                else
                {
                    RemoveFolderName();
                }                
            }
            catch(Exception ex)
            {
                LogService.Error("InsertCar - " + ex.Message, ex);
            }

            return Json(carId);
            
        }

        [HttpPost]
        public JsonResult EditCar(CarEditEntity carEditEntity)
        {
            var error = 0;

            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                var criteria = new CarEditCriteria
                {
                    UserId = int.Parse(HttpContext.Session["UserId"].ToString()),
                    CarId = carEditEntity.CarId,
                    Title = carEditEntity.Title,
                    Firm = carEditEntity.Firm,
                    Model = carEditEntity.Model,
                    IsNew = carEditEntity.IsNew,
                    IsImport = carEditEntity.IsImport,
                    TypeId = carEditEntity.TypeId,
                    CurrencyVN = carEditEntity.CurrencyVN,
                    Year = carEditEntity.Year,
                    Km = carEditEntity.Km,
                    Description = carEditEntity.Description,
                    ProvinceId = carEditEntity.ProvinceId,
                    SeatNo = carEditEntity.SeatNo,
                    GateNo = carEditEntity.GateNo,
                    ExteriorColorId = carEditEntity.ExteriorColorId,
                    InteriorColorId = carEditEntity.InteriorColorId,
                    FuelConsumption = carEditEntity.FuelConsumption,
                    FuelId = carEditEntity.FuelId,
                    FuelSystem = carEditEntity.FuelSystem,
                    GearBox = carEditEntity.GearBox,
                    WheelDriveId = carEditEntity.WheelDriveId,
                    ModifiedDate = DateTime.Now.ToShortDateString()
                };

                error = CarService.EditCar(criteria);

                if (error == 0)
                {
                    CopyFileName(carEditEntity.CarId);
                    ChangeFileName(carEditEntity.CarId);

                    var contact = new Contact { Name = HttpContext.Session["UserName"].ToString(), Email = HttpContext.Session["Email"].ToString() };
                    Proxy.SendEmail(contact, "Thông báo sửa tin", "Bạn đã sửa thông tin của tin đăng tiêu đề <br /> <br />" + carEditEntity.Title + "<br /> <br />" + approvalWaitting);
                }

                RemoveFolderName();

            }
            catch(Exception ex)
            {
                LogService.Error("EditCar - " + ex.Message, ex);
            }
            return Json(error);
        }

        [HttpPost]
        public JsonResult InsertCarBuy(CarBuyingEntity carBuyEntity)
        {
            var carBuyId = 0;

            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                var criteria = new CarBuyingInsertCriteria
                {
                    UserId = int.Parse(HttpContext.Session["UserId"].ToString()),                    
                    Title = carBuyEntity.Title,
                    Firm = carBuyEntity.Firm,
                    Model = carBuyEntity.Model,
                    IsNew = carBuyEntity.IsNew,
                    IsImport = carBuyEntity.IsImport,
                    TypeId = carBuyEntity.TypeId,
                    PriceFromVN = carBuyEntity.PriceFromVN,
                    PriceToVN = carBuyEntity.PriceToVN,
                    Year = carBuyEntity.Year,
                    Km = carBuyEntity.Km,
                    Description = carBuyEntity.Description,
                    ProvinceId = carBuyEntity.ProvinceId,
                    SeatNo = carBuyEntity.SeatNo,
                    GateNo = carBuyEntity.GateNo,
                    ExteriorColorId = carBuyEntity.ExteriorColorId,
                    InteriorColorId = carBuyEntity.InteriorColorId,
                    FuelConsumption = carBuyEntity.FuelConsumption,
                    FuelId = carBuyEntity.FuelId,
                    FuelSystem = carBuyEntity.FuelSystem,
                    GearBox = carBuyEntity.GearBox,
                    WheelDriveId = carBuyEntity.WheelDriveId,
                    CreatedDate = DateTime.Now.ToShortDateString()
                };

                carBuyId = CarService.InsertCar(criteria);

                if (carBuyId > 0)
                {                    
                    var contact = new Contact { Name = HttpContext.Session["UserName"].ToString(), Email = HttpContext.Session["Email"].ToString() };
                    Proxy.SendEmail(contact, "Thông báo đăng tin", "Bạn đã sửa thông tin của tin đăng tiêu đề<br /> <br />" + carBuyEntity.Title + "<br /> <br />" + approvalWaitting);
                }

            }
            catch(Exception ex)
            {
                LogService.Error("BuyCar - " + ex.Message, ex);
            }

            return Json(carBuyId);
        }

        [HttpPost]
        public JsonResult EditCarBuying(CarBuyingEntity carEditEntity)
        {
            var error = 0;
            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                var criteria = new CarBuyingEditCriteria
                {
                    UserId = int.Parse(HttpContext.Session["UserId"].ToString()),
                    CarId = carEditEntity.CarId,
                    Title = carEditEntity.Title,
                    Firm = carEditEntity.Firm,
                    Model = carEditEntity.Model,
                    IsNew = carEditEntity.IsNew,
                    IsImport = carEditEntity.IsImport,
                    TypeId = carEditEntity.TypeId,
                    PriceFromVN = carEditEntity.PriceFromVN,
                    PriceToVN = carEditEntity.PriceToVN,
                    Year = carEditEntity.Year,
                    Km = carEditEntity.Km,
                    Description = carEditEntity.Description,
                    ProvinceId = carEditEntity.ProvinceId,
                    SeatNo = carEditEntity.SeatNo,
                    GateNo = carEditEntity.GateNo,
                    ExteriorColorId = carEditEntity.ExteriorColorId,
                    InteriorColorId = carEditEntity.InteriorColorId,
                    FuelConsumption = carEditEntity.FuelConsumption,
                    FuelId = carEditEntity.FuelId,
                    FuelSystem = carEditEntity.FuelSystem,
                    GearBox = carEditEntity.GearBox,
                    WheelDriveId = carEditEntity.WheelDriveId,
                    ModifiedDate = DateTime.Now.ToShortDateString()
                };

                error = CarService.EditCar(criteria);

                if(error == 0)
                {
                    var contact = new Contact { Name = HttpContext.Session["UserName"].ToString(), Email = HttpContext.Session["Email"].ToString() };
                    Proxy.SendEmail(contact, "Thông báo sửa tin", "Bạn đã sửa thông tin của tin đăng tiêu đề<br /> <br />" + carEditEntity.Title + "<br /> <br />" + approvalWaitting);
                }
            }
            catch (Exception ex)
            {
                LogService.Error("EditCarBuying - " + ex.Message, ex);
            }

            return Json(error);
        }

        [HttpPost]
        public JsonResult YourActiveCar(CarSearchingYours criteria)
        {
            List<YourCarModel> listCars = new List<YourCarModel>();
            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                criteria.UserId = int.Parse(HttpContext.Session["UserId"].ToString());

                listCars = CarService.SearchingCars <YourCarModel>(criteria, AppSettings.IsGetFromCache).ToList<YourCarModel>();
            }
            catch (Exception ex)
            {
                LogService.Error("YourActiveCar - " + ex.Message, ex);
            }

            return Json(listCars);
        }

        [HttpPost]
        public JsonResult YourExpiredCar(CarSearchingYoursExpired criteria)
        {
            List<YourCarModel> listCars = new List<YourCarModel>();
            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                criteria.UserId = int.Parse(HttpContext.Session["UserId"].ToString());

                listCars = CarService.SearchingCars<YourCarModel>(criteria, AppSettings.IsGetFromCache).ToList<YourCarModel>();
            }
            catch (Exception ex)
            {
                LogService.Error("YourExpiredCar - " + ex.Message, ex);
            }

            return Json(listCars);
        }

        [HttpPost]
        public JsonResult DeleteCar(CarDeleteCriteria criteria)
        {
            var result = 0;
            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                criteria.UserId = int.Parse(HttpContext.Session["UserId"].ToString());
                result = CarService.DeleteCar(criteria);

                if (result > 0)
                {
                    if (criteria.IsBuy == false)
                    {
                        RemoveFolderName(criteria.CarId);
                    }

                    var contact = new Contact { Name = HttpContext.Session["UserName"].ToString(), Email = HttpContext.Session["Email"].ToString() };
                    Proxy.SendEmail(contact, "Thông báo xoá tin", "Bạn đã xoá tin với Id= <br /> <br />" + criteria.CarId);
                }

            }
            catch (Exception ex)
            {
                LogService.Error("DeleteCar - " + ex.Message, ex);
            }

            return Json(result);
        }

        [HttpPost]
        public JsonResult SaledCar(CarSaledCriteria criteria)
        {
            var result = 0;
            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                criteria.UserId = int.Parse(HttpContext.Session["UserId"].ToString());
                result = CarService.SaledCar(criteria);                
            }
            catch (Exception ex)
            {
                LogService.Error("SaledCar - " + ex.Message, ex);
            }

            return Json(result);
        }

        public JsonResult SearchingCarsByText(string text)
        {
            List<CarModel> listCars = new List<CarModel>();
            try
            {
                var criteria = new CarSearchingByText { Text = text };
                listCars = CarService.SearchingCars<CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            }
            catch (Exception ex)
            {
                LogService.Error("SearchingCarsByText - " + ex.Message, ex);
            }

            return Json(listCars);
        }

        public long VisitCar(CarVisitedCriteria criteria)
        {
            return CarService.VisitCar(criteria);         
        }

        [HttpPost]
        public JsonResult ApproveCar(ApproveCarCriteria criteria)
        {
            var result = 0;
            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                if (HttpContext.Session["IsAdmin"] != null && bool.Parse(HttpContext.Session["IsAdmin"].ToString()) == true)
                {
                    criteria.UserId = int.Parse(HttpContext.Session["UserId"].ToString());
                    result = CarService.ApproveCar(criteria);
                    if (result == 1)
                    {
                        var contact = new Contact { Name = criteria.UserName, Email = criteria.Email };
                        var carDetail = "<a href=\"http://www.xegiadinhviet.com/car/cardetail/" + criteria.CarId + "\">" +"http://www.xegiadinhviet.com/car/cardetail/" + criteria.CarId + "</a>";
                        Proxy.SendEmail(contact, "Duyệt tin", "Tin đăng cuả Bạn đã đuợc duyệt -> " + carDetail);
                    }
                }

            }
            catch (Exception ex)
            {
                LogService.Error("ApproveCar - " + ex.Message, ex);
            }

            return Json(result);
        }

        [HttpPost]
        public JsonResult DisApproveCar(DisApproveCarCriteria criteria)
        {
            var result = 0;
            try
            {
                if (HttpContext.Session["UserId"] == null)
                {
                    return Json(-1);
                }

                if (HttpContext.Session["IsAdmin"] != null && bool.Parse(HttpContext.Session["IsAdmin"].ToString()) == true)
                {
                    criteria.UserId = int.Parse(HttpContext.Session["UserId"].ToString());
                    result = CarService.DisApproveCar(criteria);
                    if (result == 1)
                    {
                        var contact = new Contact { Name = criteria.UserName, Email = criteria.Email };                        
                        Proxy.SendEmail(contact, "Từ chối duyệt tin", "Tin đăng của bạn đã bị từ chối. Xin  liên hệ http://xegiadinhviet.com/Home/Contact");
                    } 
                }

            }
            catch (Exception ex)
            {
                LogService.Error("DisApproveCar - " + ex.Message, ex);
            }

            return Json(result);
        }
        
        [HttpPost]
        public JsonResult SearchingCarForBuy(SearchingCarForBuyCriteria criteria)
        {
            var listCars = CarService.SearchingCars<CarModel>(criteria, AppSettings.IsGetFromCache).ToList<CarModel>();
            return Json(listCars);
        }

        #endregion

        #region Utilities

        private void RemoveFolderName(int carId = 0)
        {
            var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

            string sourceDirName = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString());
            if (carId > 0)
            {
                sourceDirName += "_" + carId;
            }

            bool isExists = System.IO.Directory.Exists(sourceDirName);
            if (isExists)
            {
                System.IO.Directory.Delete(sourceDirName, true);
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
                if (System.IO.Directory.Exists(destDirName))
                {
                    System.IO.Directory.Delete(destDirName);
                }

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
                var destinationFilename = string.Empty;
                var compressedJPG = string.Empty;
                var index = 1;                
                foreach (var file in System.IO.Directory.EnumerateFiles(destDirName))
                {                    
                    destinationFilename = string.Format("{0}\\{1}", destDirName, index + ".jpg");
                    
                    if (!file.Equals(destinationFilename))
                    {
                        if (System.IO.File.Exists(destinationFilename))
                        {
                            System.IO.File.Delete(destinationFilename);
                        }

                        compressImage(file, destinationFilename);

                        System.IO.File.Delete(file);
                    }

                    index++;
                }
            }
        }

        private void compressImage(string originalJPG, string compressedJPG)
        {
            JpegCompression.VaryQualityLevel(originalJPG, compressedJPG);
        }

        private void CopyFileName(int carId)
        {
            var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

            string sourceDirName = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString());

            string destDirName = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString() + "_" + carId);

            bool isExists = System.IO.Directory.Exists(sourceDirName);
            if (isExists)
            {                
                if (!System.IO.Directory.Exists(destDirName))
                {
                    Directory.CreateDirectory(destDirName);
                }

                foreach (var file in System.IO.Directory.GetFiles(sourceDirName))
                {
                    System.IO.File.Copy(file, destDirName + "\\" + Path.GetFileName(file));
                }
            }
        }

        private string GetListImages(int carId)
        {
            string images = string.Empty;

            var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));
            
            string path = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString() + "_" + carId);

            bool isExists = System.IO.Directory.Exists(path);
            if (isExists)
            {
                string[] files = Directory.GetFiles(path);
                for (int i = 0; i < files.Length; i++)
                {
                    images += Path.GetFileName(files[i]) + ",";
                }
            }

            return images;
        }
        
        #endregion
    }
}