using CitiesTime.Domain.Entities;
using CitiesTime.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;


namespace CitiesTime.Domain.Abstract
{
    public interface ICityRepository
    {
        ICitiesContext Context { get; set; }
        List<City> GetCities();
        City GetCityById(int id);
    }
}
