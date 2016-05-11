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
    public class CarSearchingForYouCriteria : CriteriaBase
    {
        public int CurrentPageIndex { get; set; }
        public int ItemsPerPage { get; set; }       

        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "Car_Searching_For_You";
        }

    }
}
