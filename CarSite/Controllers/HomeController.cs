﻿using Car.Framework;
using Car.Model.Criteria;
using Car.Model.Entity;
using Car.Service;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mail;
using System.Web.Mvc;

namespace CarSite.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {            
            List<string> cars = new List<string>();

            return View(cars);
        }
                
        public ActionResult Introduce()
        {
            ViewBag.Message = "Introuduce";

            return View("~/Views/Home/Introduce.cshtml");
        }
        
        public ActionResult Contact()
        {
            return View("~/Views/Home/Contact.cshtml");
        }

        public ActionResult Guide()
        {
            ViewBag.Message = "Guide";

            return View("~/Views/Home/Guide.cshtml");
        }

        public ActionResult Policy()
        {
            ViewBag.Message = "Policy";

            return View("~/Views/Home/Policy.cshtml");
        }

        public ActionResult Security()
        {
            ViewBag.Message = "Security";

            return View("~/Views/Home/Security.cshtml");
        }

        public ActionResult Salon()
        {
            return View("~/Views/Home/Salon.cshtml");
        }
        
        [HttpPost]
        public JsonResult SendMessage(Contact contact)
        {          
            try
            {                
                InsertMessage(contact);
                SendEmail(contact);
                
                return Json(true);
            }
            catch(Exception ex)
            {
                LogService.Error("SendMessage - " + ex.Message, ex);
                return Json(false);
            }
        }

        private static int InsertMessage(Contact contact)
        {
            var criteria = new ContactCriteria
            {
                Name = contact.Name,
                Email = contact.Email,
                Phone = contact.Phone,
                Message = contact.Message
            };

            return ContactService.InsertMessage(criteria);
        }

        private static void SendEmail(Contact contact)
        {
            var companyHost = new CompanyHost
            {
                Email = AppSettings.SendEmailFrom,
                Host = AppSettings.SendEmailHost,
                Port = AppSettings.SendEmailPort,
                SecurePass = AppSettings.SendEmailPass
            };
                                    
            string phone = !string.IsNullOrEmpty(contact.Phone) ? " ( SĐT: " + contact.Phone + " )" : string.Empty;

            string subject = AppSettings.DomainName + " - Liện hệ từ khách hàng " + contact.Name;
            
            string message = string.Join(null,
                "Chúng tôi đã nhận được thông tin liên hệ từ khách hàng <b>{0}</b> SĐT({1}) ",
                "<br/><br/>----------------------------------------- Nội dung liên hệ -----------------------------------------<br/>", 
                "{2}",
                "<br/>---------------------------------------------------------------------------------------------------------<br/><br/>",
                "Chúng tôi sẽ phản hồi sớm nhất cho quí khách.",
                "<br /> <br />Vui lòng liên hệ {3} ({4}) nếu cần thêm sự hỗ trợ.",
                "<br/><br/>Xin cảm ơn quí khách !",
                "<br /> <br />http://www.xegiadinhviet.com",
                "<br/><br/>----------------------------------------------------------------------------------------------------<br/>", 
                "<b>P/S: Đây là Email tự động. Xin đừng phản hồi qua email này </b>");

            string body = string.Format(message, contact.Name, phone, contact.Message, AppSettings.DomainName, "http://www.xegiadinhviet/home/contact"); 

            EmailUtility.SendEmail(companyHost, subject, body, contact.Email);
        }
    }
}