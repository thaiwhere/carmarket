using Car.Model.Criteria;
using Car.Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TQQ.Data;

namespace Car.Service
{
    /// <summary>
    /// Day la class service de call xuong DB
    /// </summary>
    public static class CarSearchingService
    {
        public static List<CarModel> SearchingCars(CarSearchingCriteria criteria)
        {
            List<CarModel> listCar = new List<CarModel>();
            //call DB here to get list car ... ---> cai nay se dung call T da gui hom truoc (se add sau )
            for (int i = 0; i < criteria.itemsPerPage; i++)
            {
                var index = (criteria.currentPageIndex * criteria.itemsPerPage) + i;
                listCar.Add(new CarModel
                {
                    CarId = index,
                    Name = "",
                    Source = true,
                    Title = "Can ban xe" + index.ToString(),
                    Content = "toi muon ban xe...",                    
                    Price = 300,
                    Status = criteria.searchingType ==2 ? true:false, // True: is New, Else : Old
                    Href  = "href",
                    Image = "/content/images/cars/" + index.ToString() + ".jpg",
                    Km = 50,
                    Type = true,//True: Hop so, False: So tu dong
                    Location = "Hà nội",
                    ContactName = "Chị oanh",
                    ContactTel = "123456789"
                }); //hard code tam cho nay
            }

            return listCar;
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
        //public static v,v,,v,v,v
    }
}
