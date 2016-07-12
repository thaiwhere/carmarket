using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    }
     
}

