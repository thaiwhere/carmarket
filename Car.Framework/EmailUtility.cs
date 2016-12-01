
using Car.Model.Entity;
using System.Net;
using System.Net.Mail;
namespace Car.Framework
{
    public static class EmailUtility
    {      
        public static void SendEmail(CompanyHost companyHost, string subject, string body, string toEmail)
        {
            string from = companyHost.Email;
            string to = toEmail;
            string companyEmail = "xegiadinhviet@gmail.com";                

            System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
            mail.IsBodyHtml = true;
            mail.Subject = subject;
            mail.Body = body;
            mail.From = new MailAddress(from);
            mail.To.Add(new MailAddress(to));
            mail.To.Add(new MailAddress(companyEmail));

            SmtpClient smtp = new SmtpClient();
            smtp.Host = companyHost.Host;
            smtp.Port = companyHost.Port;
            //smtp.TargetName = "STARTTLS/smtp.gmail.com";

            NetworkCredential authinfo = new NetworkCredential(from, companyHost.SecurePass);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = authinfo;
            smtp.EnableSsl = true;
            smtp.Send(mail);
        }
    }
}
