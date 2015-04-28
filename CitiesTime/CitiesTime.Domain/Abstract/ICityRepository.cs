using CitiesTime.Domain.Entities;
using CitiesTime.Domain.Repository;
using System;
using System.Collections.Generic;


namespace CitiesTime.Domain.Abstract
{
    public interface ICityRepository
    {
        CitiesContext Context { get; set; }
        List<City> GetCities();
        City GetCityById(int id);
    }
}
