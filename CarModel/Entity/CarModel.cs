using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Car.Model.Entity
{
    public class CarModel
    {
        public int CarId { get; set; }
        public int UserId { get; set; }
        public bool IsNew { get; set; }
        public bool IsImport { get; set; }
        public int Year { get; set; }

        public string FirmName { get; set; }
        public string Model { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Km { get; set; }
        public int GearBox { get; set; }
        public double CurrencyVN { get; set; }

        public string Province { get; set; }
        public string ContactName { get; set; }
        public string ContactTel { get; set; }
        
        public string SeatCount { get; set; }//Số chỗ ngôi
        public string DoorCount { get; set; }//Số cửa xe
        public string Fuel { get; set; }//Hệ thống nhiên liệu             

        public short IsBuy { get; set; }

        public byte Status { get; set; }

        // Slug generation taken from http://stackoverflow.com/questions/2920744/url-slugify-algorithm-in-c
        public string GenerateSlug
        {
            get
            {
                string phrase = string.Format("oto-{0}-{1}-{2}-{3}-{4}", FirmName, Model, IsImport ? "nhapkhau" : "trongnuoc", Year, CarId);

                string str = RemoveAccent(phrase).ToLower();
                // invalid chars           
                str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
                // convert multiple spaces into one space   
                str = Regex.Replace(str, @"\s+", " ").Trim();
                // cut and trim 
                str = str.Substring(0, str.Length <= 50 ? str.Length : 50).Trim();
                str = Regex.Replace(str, @"\s", "-"); // hyphens   
                return str;
            }
        }

        private string RemoveAccent(string text)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(text);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }
    }
     
}

