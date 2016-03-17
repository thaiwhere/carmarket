using Car.Model.Criteria;
using Car.Model.Entity;
using System.Collections.Generic;
using TQQ.Data;

namespace Car.Service
{
    /// <summary>
    /// Car Service class for manupulation on DB
    /// </summary>
    public static class CarService
    {
        public static IEnumerable<CarModel> SearchingCars(CarSearchingCriteria criteria)
        {            
            using (ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                return obj.Query<CarModel>();                
            }
        }   

        public static List<CarModel> GetTop10Cars(CarSearchingCriteria criteria)
        {
            List<CarModel> listCar = new List<CarModel>();
            using(ObjectDb obj = new ObjectDb(criteria.GetSettingKey()))
            {
                var ds = obj.ExecuteDataSet();
                foreach(var row in ds.Tables[0].Rows)
                {
                    listCar.Add(new CarModel
                    {
                        CarId = 1,
                        Name = "",
                        Source = true,
                        Title = "Can ban xe" + 1.ToString(),
                        Content = "toi muon ban xe...",
                        Price = 300,
                        Status = true, // True: is New, Else : Old
                        Href = "",
                        Image = "/content/images/cars/" + 1.ToString() + ".jpg",
                        Km = 50,
                        Type = true,//True: Hop so, False: So tu dong
                        Location = "Hà nội",
                        ContactName = "Chị oanh",
                        ContactTel = "123456789"
                    }); //hard code tam cho nay
                }
            }

            return listCar;
        }        
    }
}
