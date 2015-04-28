using CitiesTime.Domain.Abstract;
using CitiesTime.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CitiesTime.Domain.Repository
{
    public class CitiesRepository: ICityRepository
    {
        public CitiesContext Context { get; set; }

        public CitiesRepository(CitiesContext cont)
        {
            Context = cont;
        }

        /// <summary>
        /// This Method returns the list of the Cities thata are stored in the database
        /// </summary>
        /// <returns>List of city</returns>
        public List<City> GetCities()
        {
            return Context.Cities.ToList();
        }

        /// <summary>
        /// This Method returns a City based on his Id.
        /// </summary>
        /// <param name="id">Id of the City to find</param>
        /// <returns>The city that corresponds with the Id given</returns>
        public City GetCityById(int id)
        {
            return Context.Cities.FirstOrDefault<City>(city => city.ID == id);
        }
    }
}
