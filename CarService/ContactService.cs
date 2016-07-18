using Car.Framework;
using Car.Model.Criteria;
using Car.Model.Entity;
using System;
using System.Collections.Generic;
using TQQ.Data;
using TQQ.Data.Repository;

namespace Car.Service
{
    /// <summary>
    /// Contact Service class for manupulation on DB
    /// </summary>
    public static class ContactService
    {
        public static int InsertMessage(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);                

                var id = obj.GetParameterValue("id");

                return (id is DBNull) ? 0 : Convert.ToInt32(id);
            }
        }
    }
}
