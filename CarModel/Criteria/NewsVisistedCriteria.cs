﻿
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
    public class NewsVisistedCriteria : CriteriaBase
    {
        public string DeviceId { get; set; }

        public int Id { get; set; }

        public int IsNews { get; set; }

        public long VisistCount { get; set; }

        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "News_Visited";
        }


    }
}
