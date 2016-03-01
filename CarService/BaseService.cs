using Car.Framework;
using System;
using System.Collections;
using TQQ.Data;
using TQQ.Data.Repository;

namespace CarService
{    
    /// <summary>
    /// Base Service.
    /// </summary>
    public class BaseService
    {
        /// <summary>
        /// Updates the data.
        /// </summary>
        /// <param name="criteria">The criteria.</param>
        /// <returns>The query result.</returns>
        protected CommandResult UpdateData(ICriteria criteria)
        {
            using (var db = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();

                db.ExecuteNonQuery(param);

                return GetCommandResult(param);
            }
        }

        /// <summary>
        /// Gets the command result.
        /// </summary>
        /// <param name="hash">The hash table.</param>
        /// <returns>CommandResult object contains error code and error message.</returns>
        private CommandResult GetCommandResult(Hashtable hash)
        {
            var errCode = hash["errcode"];
            var errMsg = hash["errmsg"];

            return new CommandResult
            {
                Code = (errCode is DBNull) ? 0 : Convert.ToInt32(errCode),
                Message = (errMsg is DBNull) ? string.Empty : Convert.ToString(errMsg)
            };
        }
    }
}