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
    public class CarSearchingNewImportCriteria : CriteriaBase
    {
        
	
        public short IsNew { get; set; } 

        public short IsImport { get; set; }

        public int currentPageIndex { get; set; }

        public int itemsPerPage { get; set; }

        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "get_New_Import_Cars";
        }

    }
}
