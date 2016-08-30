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
        //[ValidateAntiForgeryToken]
        [ValidateAntiForgeryTokenOnAllPosts]
        public JsonResult Login(LoginViewModel model, string returnUrl = "")
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (CARWEBEntities entities = new CARWEBEntities())
                    {
                        string username = model.UserName;
                        string password = EncryptionHelper.Encrypt(model.Password);

                        var userValid = entities.Users.Where(user => user.UserName == username && user.Password == password);                        
                        
                        if (userValid.Count() > 0)
                        {
                            var userLogin = userValid.Single();
                            
                            FormsAuthentication.SetAuthCookie(username, false);
                            HttpContext.Session["UserId"] = userLogin.UserId.ToString();

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
                catch(Exception ex)
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
        public JsonResult Register(RegisterViewModel model, string returnUrl = "")
        {            
            if (ModelState.IsValid)
            {
                try
                {
                    using (CARWEBEntities entities = new CARWEBEntities())
                    {                        
                        bool userValid = entities.Users.Any(user => user.UserName == model.UserName) == false;

                        if (userValid)                        
                        {
                            User user = new Models.User() { 
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
                            else
                            {
                                return Json(new { userId = 0, returnUrl = string.Empty });
                            }
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


        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Home");
        }       
    }
}