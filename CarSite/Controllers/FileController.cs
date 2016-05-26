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
            string fName = "";
            foreach (string fileName in Request.Files)
            {
                HttpPostedFileBase file = Request.Files[fileName];
                //Save file content goes here
                fName = file.FileName;
                if (file != null && file.ContentLength > 0)
                {
                    if (file.ContentLength <= 1000000)
                    {
                        var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

                        string pathString = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString());

                        bool isExists = System.IO.Directory.Exists(pathString);

                        if (!isExists)
                            System.IO.Directory.CreateDirectory(pathString);

                        var path = string.Format("{0}\\{1}", pathString, fName);

                        file.SaveAs(path);
                    }
                }

            }

            if (isSavedSuccessfully)
            {
                return Json(new { Message = fName });
            }
            else
            {
                return Json(new { Message = "Error in saving file" });
            }
        }

        [HttpPost]
        public ActionResult RevmoveUploadedFile(string fileName)
        {

            var originalDirectory = new DirectoryInfo(string.Format("{0}Images", Server.MapPath(@"\")));

            string pathString = System.IO.Path.Combine(originalDirectory.ToString(), "Cars_" + HttpContext.Session["UserId"].ToString());

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

        [HttpPost]
        public ActionResult ProcessRequest(HttpContext context)
        {
            bool isUploaded = false;
            string message = "File upload failed";

            string dirFullPath = Server.MapPath("~/Uploads");
            string[] files;
            int numFiles;
            files = System.IO.Directory.GetFiles(dirFullPath);
            numFiles = files.Length;
            numFiles = numFiles + 1;

            string str_image = "";

            foreach (string s in context.Request.Files)
            {
                HttpPostedFile file = context.Request.Files[s];
                string fileName = file.FileName;
                string fileExtension = file.ContentType;

                if (!string.IsNullOrEmpty(fileName))
                {
                    fileExtension = Path.GetExtension(fileName);
                    str_image = "MyPHOTO_" + numFiles.ToString() + fileExtension;
                    string pathToSave = dirFullPath + str_image;
                    file.SaveAs(pathToSave);
                    isUploaded = true;
                    message = "File uploaded successfully!";
                }
            }

            return Json(new { isUploaded = isUploaded, message = message }, "text/html");
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
