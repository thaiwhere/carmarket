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

            listCar.Add(new Car { CarId = 1, Content = "toi muon ban xe...", Price = 300, Title = "Can ban xe" }); //hard code tam cho nay
            listCar.Add(new Car { CarId = 1, Content = "toi muon ban xe...", Price = 300, Title = "Can ban xe" }); //hard code tam cho nay
            listCar.Add(new Car { CarId = 1, Content = "toi muon ban xe...", Price = 300, Title = "Can ban xe" }); //hard code tam cho nay
            listCar.Add(new Car { CarId = 1, Content = "toi muon ban xe...", Price = 300, Title = "Can ban xe" }); //hard code tam cho nay
            listCar.Add(new Car { CarId = 1, Content = "toi muon ban xe...", Price = 300, Title = "Can ban xe" }); //hard code tam cho nay

            return listCar;
        }


        //public static v,v,,v,v,v
    }
}
