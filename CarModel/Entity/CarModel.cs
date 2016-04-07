﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.Model.Entity
{
    public class CarModel
    {
        public int CarId { get; set; }
        public string Name { get; set; }
        public bool Source { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public double Price { get; set; }
        public bool Status { get; set; }
        public string Href { get; set; }
        public string Image { get; set; }
        public int Km { get; set; }
        public string Type { get; set; } //True: Hop so, False: So tu dong
        public string Location { get; set; }
        public string ContactName { get; set; }
        public string ContactTel { get; set; }
        
        public string Style { get; set; }//Kiểu dáng
        public string ColorOut { get; set; }//Màu ngoại thất 
        public string ColorIn { get; set; }//Màu nội thất 
        public string SeatCount { get; set; }//Số chỗ ngôi
        public string DoorCount { get; set; }//Số cửa xe
        public string Fuel { get; set; }//Hệ thống nhiên liệu
        public bool IsNew { get; set; }
         
    }
     
}
