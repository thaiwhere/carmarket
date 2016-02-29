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

            listCar.Add(new Car { 
                CarId = 1, 
                Name="",
                Source=true,
                Title = "Can ban xe",               
                Content = "toi muon ban xe...",
                //lam tiep o day , xong roi noi v.v.v.v
                Price = 300,
                Status = true, // True: is New, Else : Old
                Href  = "",
                Image ="",
                Km =50,
                Type = true ,//True: Hop so, False: So tu dong
                Location="Hà nội",
                ContactName ="Chị oanh",
                ContactTel="123456789"
             }); //hard code tam cho nay
           

            return listCar;
        }


        //public static v,v,,v,v,v
    }
}
