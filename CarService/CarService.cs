using Car.Framework;
using Car.Model.Criteria;
using Car.Model.Entity;
using System.Collections.Generic;
using TQQ.Data;
using TQQ.Data.Repository;

namespace Car.Service
{
    /// <summary>
    /// Car Service class for manupulation on DB
    /// </summary>
    public static class CarService
    {
        public static IEnumerable<CarModel> SearchingCars(CriteriaBase criteria)
        {
            var cache = CacheManager.GetInstance();
            var cars = cache.GetCache<IEnumerable<CarModel>>(criteria.GetSettingKey());

            if (cars == null)
            {
                using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
                {
                    var param = criteria.GetSpParams();                    
                    cars = obj.Query<CarModel>(param);
                    cache.SetCache(criteria.GetSettingKey(), cars);
                }
            }

            return cars;
        }                                                
    }
}
