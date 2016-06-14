using CarSite.Models;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace CarSite.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl) && Request.UrlReferrer != null)
            {
                returnUrl = Server.UrlEncode(Request.UrlReferrer.PathAndQuery);
            }

            if (Url.IsLocalUrl(returnUrl) && !string.IsNullOrEmpty(returnUrl))
            {
                ViewBag.ReturnURL = returnUrl;
            }

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                using (CARWEBEntities entities = new CARWEBEntities())
                {
                    string username = model.UserName;
                    string password = model.Password;

                    bool userValid = entities.Users.Any(user => user.UserName == username && user.Password == password);

                    if (userValid)
                    {
                        var userLogin = entities.Users.Where(user => user.UserName == username && user.Password == password).Single();
                        HttpContext.Session["UserId"] = userLogin.UserId;

                        FormsAuthentication.SetAuthCookie(username, false);
                        if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                            && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                        {
                            return Redirect(returnUrl);
                        }
                        else
                        {
                            return RedirectToAction("Yours", "Car");
                        }
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "The user name or password provided is incorrect.");
                    }
                }
            }

            return View(model);
        }

        [AllowAnonymous]
        public ActionResult Register(string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl) && Request.UrlReferrer != null)
            {
                returnUrl = Server.UrlEncode(Request.UrlReferrer.PathAndQuery);
            }

            if (Url.IsLocalUrl(returnUrl) && !string.IsNullOrEmpty(returnUrl))
            {
                ViewBag.ReturnURL = returnUrl;
            }

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Register(RegisterViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                using (CARWEBEntities entities = new CARWEBEntities())
                {
                    User user = new Models.User() { UserName = model.UserName, Password = model.Password, Roles = "user" };
                    entities.Users.Add(user);

                    HttpContext.Session["UserId"] = user.UserId;

                    FormsAuthentication.SetAuthCookie(user.UserName, false);

                    if (entities.SaveChanges() > 0)
                    {
                        if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                            && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                        {
                            return Redirect(returnUrl);
                        }
                        else
                        {
                            return RedirectToAction("Yours", "Car");
                        }
                    }

                    return RedirectToAction("Insert", "Car");
                }
            }

            return View(model);
        }

        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Home");
        }
    }
}