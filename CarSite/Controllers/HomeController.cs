using Car.Framework;
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

        public ActionResult News()
        {
            return View("~/Views/Home/News.cshtml");
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
            string phone = !string.IsNullOrEmpty(contact.Phone) ? " ( SĐT: " + contact.Phone + " )" : string.Empty;

            string subject = AppSettings.DomainName + " - Liện hệ từ khách hàng " + contact.Name;

            string message = string.Join(null,
                "Chúng tôi đã nhận được thông tin liên hệ từ Bạn <b>{0}</b> {1} ",
                "<br/><br/>----------------------------------------- Nội dung liên hệ -----------------------------------------<br/>",
                "{2}",
                "<br/>---------------------------------------------------------------------------------------------------------<br/><br/>",
                "Chúng tôi sẽ phản hồi sớm nhất cho Bạn.",                
                "<br /> <br />Vui lòng liên hệ <a href=\"{4}\">{3}</a> nếu cần thêm sự hỗ trợ.",
                "<br/><br/>Trân trọng cảm ơn !",
                "<br /> <br />http://www.xegiadinhviet.com",
                "<br/><br/>----------------------------------------------------------------------------------------------------<br/>",                
                "<b>P/S: Đây là Email tự động. Xin đừng phản hồi qua email này </b>");

            string content = string.Format(message, contact.Name, phone, contact.Message, AppSettings.DomainName, "http://www.xegiadinhviet.com/home/contact");

            Proxy.SendEmail(contact, subject, content);
        }
    }
}