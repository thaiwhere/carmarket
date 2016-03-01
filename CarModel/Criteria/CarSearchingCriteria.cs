using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.Model.Criteria
{
    /// <summary>
    /// Day la class de x/d cac thong tin can tim kiem 
    /// </summary>
    public class CarSearchingCriteria
    {
        public int currentPageIndex { get; set; }
        public int itemsPerPage { get; set; }

        public int firm { get; set; }
        public string models { get; set; }
        public int original { get; set; }
        public int position { get; set; }

        public double fromPrice { get; set; }
        public double toPrice { get; set; }


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
