using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using CarSite.Models;
using System.Web.Security;
using System.Security.Principal;

namespace CarSite.Controllers
{
   [Authorize]
   public class AccountController : Controller
    {
       [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

       [HttpPost]
       [AllowAnonymous]
       [ValidateAntiForgeryToken]
       public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            // Lets first check if the Model is valid or not
            if (ModelState.IsValid)
            {
                using (CARWEBEntities entities = new CARWEBEntities())
                {
                    string username = model.UserName;
                    string password = model.Password;

                    // Now if our password was enctypted or hashed we would have done the
                    // same operation on the user entered password here, But for now
                    // since the password is in plain text lets just authenticate directly

                    bool userValid = entities.Users.Any(user => user.Username == username && user.Password == password);

                    // User found in the database
                    if (userValid)
                    {

                        FormsAuthentication.SetAuthCookie(username, false);
                        if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                            && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                        {
                            return Redirect(returnUrl);
                        }
                        else
                        {
                            return RedirectToAction("Index", "Home");
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("", "The user name or password provided is incorrect.");
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Register(RegisterViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                using (CARWEBEntities entities = new CARWEBEntities())
                {
                    User user = new Models.User() { Username = model.UserName, Password = model.Password, Roles = "user" };
                    entities.Users.Add(user);

                    FormsAuthentication.SetAuthCookie(user.Username, false);

                    if (entities.SaveChanges() > 0)
                    {                        
                        if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                            && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                        {
                            
                        }                      
                    }

                    return RedirectToAction("Index", "Home");
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