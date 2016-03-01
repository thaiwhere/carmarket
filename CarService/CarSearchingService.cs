using CarModel.Criteria;
using CarModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarService
{
    /// <summary>
    /// Day la class service de call xuong DB
    /// </summary>
    public static class CarSearchingService
    {
        public static List<Car> CarSearching (CarSearchingCriteria criteria)
        {
            List<Car> listCar = new List<Car>();
            //call DB here to get list car ... ---> cai nay se dung call T da gui hom truoc (se add sau )
            for (int i = 0; i < criteria.itemsPerPage; i++)
            {
                var index = (criteria.currentPageIndex * criteria.itemsPerPage) + i;
                listCar.Add(new Car
                {
                    CarId = index,
                    Name = "",
                    Source = true,
                    Title = "Can ban xe" + index.ToString(),
                    Content = "toi muon ban xe...",                    
                    Price = 300,
                    Status = true, // True: is New, Else : Old
                    Href = "",
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


        //public static v,v,,v,v,v
    }
}
