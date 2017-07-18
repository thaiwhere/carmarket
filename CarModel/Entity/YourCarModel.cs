using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.Model.Entity
{
    public class YourCarModel
    {
        public int CarId { get; set; }
        
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public bool IsNew { get; set; }
        public bool IsImport { get; set; }
        public int Year { get; set; }

        public string FirmName { get; set; }        
        public string Title { get; set; }
        
        public short IsBuy { get; set; }        
        public byte Status { get; set; }

        public string ModifiedDate { get; set; }
        public int CountVisit { get; set; }
    }
     
}

