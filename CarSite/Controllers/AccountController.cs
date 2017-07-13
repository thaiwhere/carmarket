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
using Car.Model.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;

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
        //[ValidateAntiForgeryToken]
        [ValidateAntiForgeryTokenOnAllPosts]
        public JsonResult Login(LoginViewModel model, string returnUrl = "", string encodedResponse = "")
        {
            if (ModelState.IsValid)
            {
                try
                {
                    bool IsCaptchaValid = true;//todo (ReCaptcha.Validate(encodedResponse) == "True" ? true : false);

                    if (IsCaptchaValid)
                    {
                        using (CARWEBEntities entities = new CARWEBEntities())
                        {
                            string username = model.UserName;
                            string password = EncryptionHelper.Encrypt(model.Password);

                            var userValid = entities.Users.Where(user => user.UserName == username && user.Password == password);

                            if (userValid.Count() > 0)
                            {
                                var userLogin = userValid.Single();

                                if (username.ToLower().Equals("admin"))
                                {
                                    HttpContext.Session["IsAdmin"] = true;
                                }

                                FormsAuthentication.SetAuthCookie(username, false);
                                HttpContext.Session["UserId"] = userLogin.UserId.ToString();
                                HttpContext.Session["UserName"] = userLogin.UserName;
                                HttpContext.Session["Email"] = userLogin.Email;

                                if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                                && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                                {
                                    return Json(new { userId = userLogin.UserId.ToString(), returnUrl = returnUrl });
                                }
                                else
                                {
                                    return Json(new { userId = userLogin.UserId.ToString(), returnUrl = string.Empty });
                                }

                            }
                        }
                    }
                    else
                    {
                        return Json(new { userId = -2, returnUrl = string.Empty });
                    }
                }
                catch (Exception ex)
                {
                    LogService.Error("Login - " + ex.Message, ex);
                }
            }

            return Json(new { userId = 0, returnUrl = string.Empty });
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
        public JsonResult Register(RegisterViewModel model, string returnUrl = "", string encodedResponse = "")
        {            
            if (ModelState.IsValid)
            {
                try
                {
                    bool IsCaptchaValid = true;//todo (ReCaptcha.Validate(encodedResponse) == "True" ? true : false);

                    if (IsCaptchaValid)
                    {
                        using (CARWEBEntities entities = new CARWEBEntities())
                        {
                            bool userValid = entities.Users.Any(user => user.UserName == model.UserName) == false;

                            if (userValid)
                            {
                                User user = new Models.User()
                                {
                                    UserName = model.UserName,
                                    Password = EncryptionHelper.Encrypt(model.Password),
                                    Roles = "user",
                                    Tel = model.Tel,
                                    Email = model.Email,
                                    Address = model.Address,
                                    CreatedDate = DateTime.Now,
                                    IsActive = true
                                };

                                entities.Users.Add(user);

                                if (entities.SaveChanges() > 0)
                                {
                                    var registedUser = entities.Users.Select(u => u).Where(u => u.UserName.Equals(model.UserName)).First();

                                    FormsAuthentication.SetAuthCookie(user.UserName, false);
                                    HttpContext.Session["UserId"] = registedUser.UserId.ToString();

                                    var contact = new Contact { Name = model.UserName, Email = model.Email };
                                    var content = string.Format("Bạn đã trở thành thành viên <b>xegiadinhviet.com</b>, nơi đăng tin mua, bán, thuê xe <b>HOÀN TOÀN MIỄN PHÍ</b>. <br/><br/> Tên truy cập: {0}, Mật khẩu: {1} <br/><br/> Click {2} để đăng tin miễn phí", model.UserName, model.Password, "<a href =\"http://www.xegiadinhviet.com/car/insert\">Đăng tin</a>");

                                    Proxy.SendEmail(contact, "Thành viên", content);

                                    if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                                    && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                                    {
                                        return Json(new { userId = registedUser.UserId.ToString(), returnUrl = returnUrl });
                                    }
                                    else
                                    {
                                        return Json(new { userId = registedUser.UserId.ToString(), returnUrl = string.Empty });
                                    }
                                }
                            }
                            else
                            {
                                return Json(new { userId = 0, returnUrl = string.Empty });
                            }
                        }
                    }
                    else
                    {
                        return Json(new { userId = -2, returnUrl = string.Empty });
                    }
                }
                catch (DbEntityValidationException dbEx)
                {
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            Trace.TraceInformation(
                                  "Class: {0}, Property: {1}, Error: {2}",
                                  validationErrors.Entry.Entity.GetType().FullName,
                                  validationError.PropertyName,
                                  validationError.ErrorMessage);
                        }
                    }
                }
                catch(Exception ex)
                {
                    LogService.Error("Register - " + ex.Message, ex);
                }
            }

            return Json(new { userId = -1, returnUrl = string.Empty });
        }


        [Authorize]
        public ActionResult Manage()
        {
            if (HttpContext.Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account");
            }

            return View();
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryTokenOnAllPosts]
        public JsonResult Manage(ManageUserViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {                    
                    var oldPassword = EncryptionHelper.Encrypt(model.OldPassword);

                    using (CARWEBEntities entities = new CARWEBEntities())
                    {
                        var userId = int.Parse(HttpContext.Session["UserId"].ToString());
                        var userValid = entities.Users.Where(user => user.UserId == userId && user.Password.Equals(oldPassword));
                        
                        if (userValid.Count() > 0)
                        {
                            var userLogin = userValid.Single();

                            if (!string.IsNullOrEmpty(model.NewPassword))
                            {
                                userLogin.Password = EncryptionHelper.Encrypt(model.NewPassword);
                            }

                            if(!string.IsNullOrEmpty(model.Tel))
                            {
                                userLogin.Tel = model.Tel;
                            }

                            if(!string.IsNullOrWhiteSpace(model.Email))
                            {
                                userLogin.Email = model.Email;
                            }

                            if (!string.IsNullOrWhiteSpace(model.Address))
                            {
                                userLogin.Address = model.Address;
                            }

                            if (entities.SaveChanges() > 0)
                            {
                                var contact = new Contact { Name = HttpContext.Session["UserName"].ToString(), Email = model.Email };
                                var content = string.Format("Bạn đã thay đổi tài khoản: Tên đăng nhập = {0}, Mật khẩu = {1}, Số điện thoại = {2}, Email ={3}, Địa chỉ = {4}", HttpContext.Session["UserName"].ToString(), model.NewPassword, model.Tel, model.Email, model.Address);
                                Proxy.SendEmail(contact, "Thông báo thay đổi tài khoản", content);

                                return Json(new { userId = userId, returnUrl = string.Empty });
                            }                            
                        }
                        else
                        {
                            return Json(new { userId = 0, returnUrl = string.Empty });
                        }
                    }
                }
                catch (Exception ex)
                {
                    LogService.Error("Manage - " + ex.Message, ex);
                }
            }

            // If we got this far, something failed, redisplay form
            return Json(new { userId = -1, returnUrl = string.Empty });
        }

        [AllowAnonymous]
        public ActionResult RecoverPass(string returnUrl)
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
        [ValidateAntiForgeryTokenOnAllPosts]
        public JsonResult RecoverPass(RecoverPassViewModel model, string returnUrl = "")
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var userName = model.UserName;
                    var email = model.Email;

                    using (CARWEBEntities entities = new CARWEBEntities())
                    {
                        var userValid = entities.Users.Where(user => user.UserName == userName || user.Email == email);

                        if (userValid.Count() > 0)
                        {
                            var userLogin = userValid.First();
                                                        
                            var contact = new Contact { Name = userLogin.UserName, Email = userLogin.Email };

                            Proxy.SendEmail(contact, "Thông báo mật khẩu Khách hàng: " + userName, "Mật khẩu cuả quý khách là : " + EncryptionHelper.Decrypt(userLogin.Password));                            

                            if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                                && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                            {
                                return Json(new { userId = userLogin.UserId.ToString(), email = userLogin.Email, returnUrl = returnUrl });
                            }
                            else
                            {
                                return Json(new { userId = userLogin.UserId.ToString(), email = userLogin.Email, returnUrl = string.Empty });
                            }
                        }
                        else
                        {
                            return Json(new { userId = 0, returnUrl = string.Empty });
                        }
                    }
                }
                catch (Exception ex)
                {
                    LogService.Error("RecoverPass - " + ex.Message, ex);
                }
            }

            // If we got this far, something failed, redisplay form
            return Json(new { userId = -1, returnUrl = string.Empty });
        }

        public ActionResult LogOff()
        {
            HttpContext.Session["UserId"] = null;
            HttpContext.Session["IsAdmin"] = null;

            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Home");
        }       
    }
}