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
        public static IEnumerable<T> SearchingCarsForYou<T>(CriteriaBase criteria, bool isGetFromCache = false)
        {            
            var cacheKey = string.Empty;
            ICache cache = null;            
            IEnumerable<T> cars = null;
                        
            try
            {
                var param = criteria.GetSpParams();
         
                if (isGetFromCache)
                {
                    cache = CacheManager.GetInstance();
                    cacheKey = criteria.GetSettingKey() + "SearchingCarsForYou";
                    cars = cache.GetCache<IEnumerable<T>>(cacheKey);
                }

                if (cars == null)
                {
                    using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
                    {                        
                        cars = obj.Query<T>(param);

                        if (isGetFromCache && cache != null)
                        {
                            cache.SetCache(cacheKey, cars);
                        }
                    }
                }

                return cars ?? new List<T>();
            }
            catch (Exception ex)
            {
                LogService.Error("SearchingCarsForYou - " + ex.Message, ex);
                return new List<T>();
            }            
        }

        public static IEnumerable<T> SearchingCars<T>(CriteriaBase criteria, bool isGetFromCache = false)
        {
            var carId = string.Empty;
            var cacheKey = string.Empty;
            ICache cache = null;
            IEnumerable<T> cars = null;

            try
            {
                var param = criteria.GetSpParams();
                if (param["carid"] != null)
                {
                    carId = param["carid"].ToString();
                }

                if (isGetFromCache && !string.IsNullOrEmpty(carId))
                {
                    cache = CacheManager.GetInstance();
                    cacheKey = criteria.GetSettingKey() + carId;
                    cars = cache.GetCache<IEnumerable<T>>(cacheKey);
                }

                if (cars == null)
                {
                    using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
                    {
                        cars = obj.Query<T>(param);

                        if (isGetFromCache && cache != null)
                        {
                            cache.SetCache(cacheKey, cars);
                        }
                    }
                }

                return cars ?? new List<T>();
            }
            catch (Exception ex)
            {
                LogService.Error("SearchingCars - " + ex.Message, ex);
                return new List<T>();
            }
        }

        public static CarViewModel SearchingCarDetail(CriteriaBase criteria, bool isGetFromCache = false)
        {            
            var carId = string.Empty;
            var cacheKey = string.Empty;
            ICache cache = null;
            CarViewModel carViewModel = null;

            try
            {
                var param = criteria.GetSpParams();
                if (param["carid"] != null)
                {
                    carId = param["carid"].ToString();
                }

                if (isGetFromCache && !string.IsNullOrEmpty(carId))
                {
                    cache = CacheManager.GetInstance();
                    cacheKey = criteria.GetSettingKey() + carId;                    
                    carViewModel = cache.GetCache<CarViewModel>(cacheKey);
                }

                if (carViewModel == null)
                {
                    using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
                    {                        
                        carViewModel = obj.QueryEntity<CarViewModel>(param);

                        if (isGetFromCache && cache != null)
                        {
                            cache.SetCache(cacheKey, carViewModel);
                        }
                    }
                }

                return carViewModel;
            }
            catch (Exception ex)
            {
                LogService.Error("SearchingCarDetail - " + ex.Message, ex);
                return new CarViewModel();
            }                       
        }

        public static CarEditEntity GetCarEditInfo(CriteriaBase criteria)
        {
            try
            {
                using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
                {
                    var param = criteria.GetSpParams();
                    return obj.QueryEntity<CarEditEntity>(param);
                }
            }
            catch (Exception ex)
            {
                LogService.Error("GetCarEditInfo - " + ex.Message, ex);
                return new CarEditEntity();
            }
        }

        public static CarBuyingEntity GetCarBuyEditInfo(CriteriaBase criteria)
        {
            try
            {
                using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
                {
                    var param = criteria.GetSpParams();
                    return obj.QueryEntity<CarBuyingEntity>(param);
                }
            }
            catch (Exception ex)
            {
                LogService.Error("GetCarBuyEditInfo - " + ex.Message, ex);
                return new CarBuyingEntity();
            }
        }

        public static int InsertCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var carId = obj.GetParameterValue("carid");

                return (carId is DBNull) ? 0 : Convert.ToInt32(carId);
            }
        }

        public static int EditCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var IsError = obj.GetParameterValue("error");

                return (IsError is DBNull) ? 0 : Convert.ToInt32(IsError);
            }
        }


        public static int DeleteCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var result = obj.GetParameterValue("result");

                return (result is DBNull) ? 0 : Convert.ToInt32(result);
            }
        }

        public static int SaledCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var result = obj.GetParameterValue("result");

                return (result is DBNull) ? 0 : Convert.ToInt32(result);
            }
        }

        public static long VisitCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var countVisit = obj.GetParameterValue("countvisit");

                return (countVisit is DBNull) ? 0 : Convert.ToInt64(countVisit);
            }
        }

        public static int ApproveCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var result = obj.GetParameterValue("result");

                return (result is DBNull) ? 0 : Convert.ToInt32(result);
            }
        }

        public static int DisApproveCar(CriteriaBase criteria)
        {
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var param = criteria.GetSpParams();
                obj.ExecuteNonQuery(param);

                var result = obj.GetParameterValue("result");

                return (result is DBNull) ? 0 : Convert.ToInt32(result);
            }
        }
    }
}
