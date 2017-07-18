﻿using System;
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
    public class DisApproveCarCriteria : CriteriaBase
    {
        public int CarId { get; set; }

        public int UserId { get; set; }

        [SpParam(Ignored = true)]
        public string UserName { get; set; }

        [SpParam(Ignored = true)]
        public string Email { get; set; }

        public short IsBuy { get; set; }

        public bool Result { get; set; }

        /// <summary>
        /// Gets Setting Key.
        /// </summary>
        /// <returns>Setting key of the criteria.</returns>
        public override string GetSettingKey()
        {
            return "Car_DisApprove";
        }
    }
}
