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
    public class CarSearchingCriteria : CriteriaBase
    {
        public int currentPageIndex { get; set; }
        public int itemsPerPage { get; set; }

        public int firm { get; set; }
        public string models { get; set; }
        public int searchingType { get; set; }
        public int original { get; set; }
        public int position { get; set; }

        public double fromPrice { get; set; }
        public double toPrice { get; set; }


        public bool IsNew { get; set; }
        

        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public string GetSettingKey()
        {
            return "Car_Searching";
        }

    }
}
