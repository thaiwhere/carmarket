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
        
        public ActionResult About()
        {            
            return View();
        }
        
        public ActionResult Contact()
        {
            return View("~/Views/Home/Contact.cshtml");
        }

        public ActionResult Guide()
        {
            ViewBag.Message = "Your Guide page.";

            return View();
        }
  
        public ActionResult Salon()
        {
            return View();
        }
        
        [HttpPost]
        public JsonResult SendMessage(Contact contact)
        {          
            try
            {                
                if (InsertMessage(contact) > 0)
                {
                    SendEmail(contact);

                }

                return Json(true);
            }
            catch
            {
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
            string from = AppSettings.SendEmailFrom;
            string to = contact.Email;

            System.Net.Mail.MailMessage m = new System.Net.Mail.MailMessage();
            m.Subject = "Contact from " + contact.Name;
            m.Body = contact.Message;
            m.From = new MailAddress(from);
            m.To.Add(new MailAddress(to));

            SmtpClient smtp = new SmtpClient();
            smtp.Host = AppSettings.SendEmailHost;
            smtp.Port = AppSettings.SendEmailPort;
            //smtp.TargetName = "STARTTLS/smtp.gmail.com";

            NetworkCredential authinfo = new NetworkCredential(from, AppSettings.SendEmailPass);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = authinfo;
            smtp.EnableSsl = true;
            smtp.Send(m);
        }
    }
}