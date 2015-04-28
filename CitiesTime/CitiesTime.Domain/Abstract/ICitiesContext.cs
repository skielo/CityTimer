using CitiesTime.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CitiesTime.Domain.Abstract
{
    public interface ICitiesContext
    {
        DbSet<City> Cities { get; set; }
        DbSet<RequestLog> Requests { get; set; }
    }
}
