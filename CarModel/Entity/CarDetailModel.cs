using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Car.Model.Entity
{
    public class CarDetailModel
    {
        public int UserId { get; set; }

        public int CarId { get; set; }
        
        public string Title { get; set; }

        public string Firm { get; set; }

        public string Model { get; set; }
        
        public string IsNew { get; set; }

        public string IsImport { get; set; }

        public string Type { get; set; }

        public double CurrencyVN { get; set; }

        public int Year { get; set; }

        public int Km { get; set; }

        public string Description { get; set; }

        public string Province { get; set; }

        public int SeatNo { get; set; }

        public int GateNo { get; set; }

        public string ExteriorColor { get; set; }

        public string InteriorColor { get; set; }

        public string FuelConsumption { get; set; } //6L/100km

        public string Fuel { get; set; }

        public string FuelSystem { get; set; }

        public string GearBox { get; set; } // 0: AT, 1:composition, >4: MT
        
        public string WheelDrive { get; set; }

        public string ContactName { get; set; }
        
        public string ContactTel { get; set; }
        
        public string Address { get; set; }

        public string Code { get; set; }

        public string CreatedDate { get; set; }

        public int CountVisit { get; set; }

        public string GenerateSlug
        {
            get
            {
                string phrase = string.Format("xegiadinhviet-oto-{0}-{1}-{2}-{3}", Firm, Model, IsImport, ContactName);

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

