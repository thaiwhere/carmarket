using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarModel.Entity
{
    public class Car
    {
        public int CarId { get; set; }
        public int Source { get; set; }//torng nuoc hay ngoai nuoc
        public string Title { get; set; }
        public string Content { get; set; }
        public double Price { get; set; }

    }
     
}
