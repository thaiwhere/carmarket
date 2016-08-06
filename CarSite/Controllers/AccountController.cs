using CarSite.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Configuration;
using Car.Framework;
using System;

namespace CarSite.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {        
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }
     
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
                try
                {
                    using (CARWEBEntities entities = new CARWEBEntities())
                    {
                        string username = model.UserName;
                        string password = EncryptionHelper.Encrypt(model.Password);

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
                            ModelState.AddModelError(string.Empty, "Tên đăng nhập hoặc Mật khẩu không chính xác.");
                        }
                    }
                }
                catch(Exception ex)
                {
                    LogService.Error("Login - " + ex.Message, ex);
                }
            }

            return View(model);
        }

        [AllowAnonymous]
        public ActionResult Register(string returnUrl)
        {
            ViewBag.ExistedUser = string.Empty;

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
        //[ValidateAntiForgeryToken]
        [ValidateAntiForgeryTokenOnAllPosts]
        public JsonResult Register(RegisterViewModel model, string returnUrl = "")
        {            
            if (ModelState.IsValid)
            {
                try
                {
                    using (CARWEBEntities entities = new CARWEBEntities())
                    {
                        if (entities.Users.Where(u => u.UserName.Equals(model.UserName)).Count() >0 )
                        {
                            ViewBag.ExistedUser = "Tên truy cập đã tồn tại, vui lòng chọn tên khác.";
                        }
                        else
                        {
                            User user = new Models.User() { 
                                UserName = model.UserName, 
                                Password = EncryptionHelper.Encrypt(model.Password), 
                                Roles = "user",
                                Tel = model.Tel,
                                CreatedDate = DateTime.Now,
                                IsActive = true
                            };

                            entities.Users.Add(user);                            

                            FormsAuthentication.SetAuthCookie(user.UserName, false);

                            if (entities.SaveChanges() > 0)
                            {
                                var registedUser = entities.Users.Select(u => u).Where(u => u.UserName.Equals(model.UserName)).First();

                                HttpContext.Session["UserId"] = registedUser.UserId.ToString();

                                if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                                && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                                {
                                    return Json(new { userId = registedUser.UserId.ToString(), returnUrl = returnUrl} );
                                }
                                else
                                {
                                    return Json(new { userId = registedUser.UserId.ToString(), returnUrl = string.Empty });
                                }
                                
                            }                            
                        }
                    }
                }
                catch(Exception ex)
                {
                    LogService.Error("Register - " + ex.Message, ex);
                }
            }

            return Json(new { userId = 0, returnUrl = string.Empty });
        }


        [Authorize]
        public ActionResult Manage()
        {
            ViewBag.HasError = "";
            ViewBag.ReturnUrl = Url.Action("Manage");

            return View();
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public ActionResult Manage(ManageUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var newPassword = EncryptionHelper.Encrypt(model.NewPassword);
                    var oldPassword = EncryptionHelper.Encrypt(model.OldPassword);

                    if (newPassword.Equals(oldPassword))
                    {
                        ViewBag.HasError = "ERROR";
                        ViewBag.StatusMessage = "Mập khẩu mới trùng với mật khẩu cũ.";
                    }
                    else
                    {
                        using (CARWEBEntities entities = new CARWEBEntities())
                        {
                            var userId = int.Parse(HttpContext.Session["UserId"].ToString());
                            bool userValid = entities.Users.Any(user => user.UserId == userId && EncryptionHelper.Encrypt(user.Password).Equals(oldPassword));

                            if (userValid)
                            {
                                var userLogin = entities.Users.Where(user => user.UserId == userId && EncryptionHelper.Encrypt(user.Password).Equals(oldPassword)).Single();
                                if (userLogin != null)
                                {
                                    ViewBag.HasError = "";
                                    ViewBag.StatusMessage = "Mập khẩu đã được thay đổi thành công.";
                                    userLogin.Password = newPassword;
                                    entities.SaveChanges();
                                }
                            }
                            else
                            {
                                ViewBag.HasError = "ERROR";
                                ViewBag.StatusMessage = "Mập khẩu cũ không khớp.";
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    LogService.Error("Manage - " + ex.Message, ex);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Home");
        }       
    }
}