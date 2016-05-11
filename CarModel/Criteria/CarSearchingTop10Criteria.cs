using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TQQ.Data.Repository;

namespace Car.Model.Criteria
{
    /// <summary>
    /// 
    /// </summary>
    public class CarSearchingTop10Criteria : CriteriaBase
    {
        public int CurrentPageIndex { get; set; }

        public int ItemsPerPage { get; set; }

        public int firm { get; set; }

        public string models { get; set; }

        public int searchingType { get; set; }

        public int original { get; set; }

        //public int position { get; set; }

        public double fromPrice { get; set; }

        public double toPrice { get; set; }

        public int User { get; set; }

        public string Code { get; set; }

        public string Title { get; set; }

        public string Class { get; set; }


        public short IsImport { get; set; }

        public int Year { get; set; }

        public string Province { get; set; }

        public short Status { get; set; }

        public int Km { get; set; }

        public string Type { get; set; }

        public double PriceVN { get; set; }

        public double PriceUSD { get; set; }

        public string ExteriorColor { get; set; }

        public string InteriorColor { get; set; }

        public int WindowNo { get; set; }

        public int SeatNo { get; set; }

        public string Description { get; set; }

        public short GearBox { get; set; }

	    public string WheelDrive { get; set; }

	    public string FuelSystem { get; set; }

        public string FuelConsumption { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ModifiedDate { get; set; }

        public DateTime ExpiredDate { get; set; }




        public short IsNew { get; set; }
        

        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "SP_TOP_10_CARS";
        }

    }
}
