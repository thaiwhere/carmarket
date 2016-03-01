using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.Model.Entity
{
    public class CarModel
    {
        public int CarId { get; set; }
        public string Name { get; set; }
        public bool Source { get; set; }//torng nuoc hay ngoai nuoc
        public string Title { get; set; }
        public string Content { get; set; }
        public double Price { get; set; }
        public bool Status { get; set; } // True: is New, Else : Old
        public string Href { get; set; }
        public string Image { get; set; }
        public int Km { get; set; }
        public bool Type { get; set; } //True: Hop so, False: So tu dong
        public string Location { get; set; }
        public string ContactName { get; set; }
        public string ContactTel { get; set; }
    }
     
}
