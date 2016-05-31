using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestAjaxUpload
{
    /// <summary>
    /// File Controller
    /// </summary>
    public class FileController : Controller
    {
        #region Actions

        /// <summary>
        /// Uploads the file.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public virtual ActionResult UploadFile()
        {
            bool isSavedSuccessfully = true;                        
            try
            {
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];

                    if (file != null && file.ContentLength > 0)
                    {
                        var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

                        string pathString = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString());

                        bool isExists = System.IO.Directory.Exists(pathString);

                        if (!isExists)
                        {
                            System.IO.Directory.CreateDirectory(pathString);
                        }                       

                        var path = string.Format("{0}\\{1}", pathString, file.FileName + ".jpg");

                        file.SaveAs(path);
                    }

                }
            }
            catch
            {
                isSavedSuccessfully = false;
            }

            return Json(isSavedSuccessfully);            
        }

        [HttpPost]
        public ActionResult RevmoveUploadedFile(string fileName)
        {

            var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

            var folderName = "Cars_" + HttpContext.Session["UserId"].ToString();

            string pathString = System.IO.Path.Combine(originalDirectory.ToString(), folderName);

            bool isExists = System.IO.Directory.Exists(pathString);

            if (isExists)
            {
                var path = string.Format("{0}\\{1}", pathString, fileName);

                System.IO.File.Delete(path);

                return Json(new { Message = fileName });
            }
            else
            {
                return Json(new { Message = "Error in removing file" });
            }
        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Creates the folder if needed.
        /// </summary>
        /// <param name="path">The path.</param>
        /// <returns></returns>
        private bool CreateFolderIfNeeded(string path)
        {
            bool result = true;
            if (!Directory.Exists(path))
            {
                try
                {
                    Directory.CreateDirectory(path);
                }
                catch (Exception)
                {
                    /*TODO: You must process this exception.*/
                    result = false;
                }
            }
            return result;
        }

        #endregion
    }
}
