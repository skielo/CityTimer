using System;
using System.Collections.Generic;


namespace CitiesTime.Domain.Entities
{
    public class RequestLog
    {
        public int ID { get; set; }
        public int CityID { get; set; }
        public DateTime TimeRequest { get; set; }

        public virtual City RequestedCity { get; set; } 
    }
}
