using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace Car.Model.Entity
{
    public class CarInsertEntity
    {
        public int UserId { get; set; }

        [DisplayName("Tiêu đề (*)")]
        public string Title { get; set; }

        [DisplayName("Hãng xe")]
        public string Firm{ get; set; }

        [DisplayName("Dòng xe")]
        public string Model { get; set; }

        [DisplayName("Xe mới")]
        public bool IsNew { get; set; }

        [DisplayName("Xe nhập khẩu")]
        public bool IsImport { get; set; }

        [DisplayName("Kiểu dáng")]
        public string TypeId { get; set; }

        [DisplayName("Giá (Triệu)")]
        public double CurrencyVN { get; set; }
                
        [DisplayName("Năm sản xuất")]
        public int Year { get; set; }

        [DisplayName("Số km đã đi")]
        public int Km { get; set; }        

        [DisplayName("Thông tin mô tả (*)")]
        public string Description { get; set; }

        [DisplayName("Tỉnh/Thành")]        
        public string ProvinceId { get; set; }

        [DisplayName("Số chỗ")]
        public int SeatNo { get; set; }

        [DisplayName("Số cửa")]
        public int GateNo { get; set; }

        [DisplayName("Màu ngoại thất")]
        public string ExteriorColorId { get; set; }

        [DisplayName("Màu nội thất")]
        public string InteriorColorId { get; set; }

        [DisplayName("Tiêu thụ (Lít/100km)")]
        public int FuelConsumption { get; set; } //6L/100km

        [DisplayName("Nhiên liệu")]
        public string FuelId { get; set; }

        [DisplayName("Hệ thống nạp nhiên liệu")]
        public string FuelSystem { get; set; }

        [DisplayName("Hộp số")]
        public int GearBox { get; set; } // 0: AT, 1:composition, >4: MT

        [DisplayName("Dẫn động")]
        public string WheelDriveId { get; set; }

        public string CreatedDate { get; set; }
    }
     
}

