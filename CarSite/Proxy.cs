using Car.Framework;
using Car.Model.Entity;

namespace CarSite
{
    public class Proxy
    {
        public static void SendEmail(Contact contact, string subject, string content)
        {
            var companyHost = new CompanyHost
            {
                Email = AppSettings.SendEmailFrom,
                Host = AppSettings.SendEmailHost,
                Port = AppSettings.SendEmailPort,
                SecurePass = AppSettings.SendEmailPass
            };

            string message = string.Join(null, "Xin chào <b>{0}</b> {1},"
                               , "<br /> <br /> ", content
                               , "<br /> <br />Vui lòng liên hệ <a href=\"{3}\">{2}</a> nếu cần thêm sự hỗ trợ."
                               , "<br/><br/>Xin cảm ơn quí khách !"
                               , "<br /> <br /><a href =\"http://www.xegiadinhviet.com\">xegiadinhviet.com</a>"
                               , "<br/><br/>----------------------------------------------------------------------------------------------------<br/>"
                               , "<b>P/S: Đây là Email tự động. Xin đừng phản hồi qua email này </b>");

            string phone = !string.IsNullOrEmpty(contact.Phone) ? " ( SĐT: " + contact.Phone + " )" : string.Empty;

            string body = string.Format(message, contact.Name, phone, AppSettings.DomainName, "http://www.xegiadinhviet.com/home/contact");

            EmailUtility.SendEmail(companyHost, AppSettings.DomainName + " - " + subject, body, contact.Email);            
        }
    }
}