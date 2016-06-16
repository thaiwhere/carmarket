using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TQQ.Data.Repository;

namespace Car.Model.Criteria
{
    /// <summary>
    /// Searching cars by firm or model or province
    /// </summary>
    public class CarSearchingFirmModelProvinceCriteria : CriteriaBase
    {
        public int CurrentPageIndex { get; set; }

        public int ItemsPerPage { get; set; }

        public string FirmName { get; set; }

        public string Model { get; set; }

        public string Province { get; set; }
     
        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "Car_Searching_Firm_Model_Province";
        }

    }
}
