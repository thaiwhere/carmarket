using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TQQ.Data.Repository;

namespace Car.Model.Criteria
{
    /// <summary>
    /// Class nay dung de search cars, Khi viet sp thi cac tham so cho gia tri mac dinh de ko truyen vao thi ko bao loi~
    /// </summary>
    public class CarSearchingCriteria : CriteriaBase
    {
        public string FirmName { get; set; }

        public string Model { get; set; }

        public short IsNew { get; set; } 

        public short IsImport { get; set; }

        public double fromPrice { get; set; }

        public double toPrice { get; set; }
      
        public int Year { get; set; }

        public string Province { get; set; }
                
        public string ExteriorColor { get; set; }

        public string InteriorColor { get; set; }

        public int WindowNo { get; set; }

        public int SeatNo { get; set; }

        public int currentPageIndex { get; set; }

        public int itemsPerPage { get; set; }

        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "Car_Searching"; // Vien can viet sp nay voi cac tham so o tren
        }

    }
}
