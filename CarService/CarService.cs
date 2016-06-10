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
    /// Car Service class for manupulation on DB
    /// </summary>
    public static class CarService
    {
        public static IEnumerable<CarModel> SearchingCars(CriteriaBase criteria)
        {
            var cache = CacheManager.GetInstance();
            var cars = cache.GetCache<IEnumerable<CarModel>>(criteria.GetSettingKey());

            //if (cars == null)
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

        public static CarViewModel SearchingCarDetail(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                return obj.QueryEntity<CarViewModel>(param);
            }
        }

        public static int InsertCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var carId = param["carid"];

                return (carId is DBNull) ? 0 : Convert.ToInt32(carId);
            }
        }

        public static int DeleteCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var carId = param["carid"];

                return (carId is DBNull) ? 0 : Convert.ToInt32(carId);
            }
        }
    }
}
