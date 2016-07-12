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
    public class CarBuyingGettingForEditCriteria : CriteriaBase
    {       
        public int CarId { get; set; }
      
        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "get_Car_Buy_Edit_Info";
        }
    }
}
