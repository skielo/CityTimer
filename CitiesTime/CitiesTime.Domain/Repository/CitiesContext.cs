using CitiesTime.Domain.Abstract;
using CitiesTime.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CitiesTime.Domain.Repository
{
    public class CitiesContext : DbContext, ICitiesContext
    {
        public CitiesContext()
        {
            Database.SetInitializer<CitiesContext>(null);
        }

        public DbSet<City> Cities { get; set; }
        public DbSet<RequestLog> Requests { get; set; }
    }
}
