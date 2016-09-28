using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TQQ.Data.Repository;

namespace Car.Model.Criteria
{
    /// <summary>    
    /// </summary>
    public class CarBuyingInsertCriteria : CriteriaBase
    {
        public int UserId { get; set; }

        public string Code { get; set; }

        public string Title { get; set; }
        
        public string Firm { get; set; }

        public string Model { get; set; }

        public bool IsNew { get; set; }

        public bool IsImport { get; set; }

        public string TypeId { get; set; }

        public double PriceFromVN { get; set; }

        public double PriceToVN { get; set; }

        public int Year { get; set; }

        public int Km { get; set; }

        public string Description { get; set; }

        public string ProvinceId { get; set; }

        public int SeatNo { get; set; }

        public int GateNo { get; set; }

        public string ExteriorColorId { get; set; }

        public string InteriorColorId { get; set; }

        public int FuelConsumption { get; set; } //6L/100km

        public string FuelId { get; set; }

        public string FuelSystem { get; set; }

        public int GearBox { get; set; } // 0: AT, 1:composition, >4: MT

        public string WheelDriveId { get; set; }

        public string CreatedDate { get; set; }

        public int CarId { get; set; }
        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "Car_Buying_Insert";
        }
    }
}
