using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CitiesTime.Domain.Abstract;
using CitiesTime.WebUI.Controllers;
using Ninject;
using CitiesTime.Domain.Repository;
using CitiesTime.Domain.Entities;
using System.Collections.Generic;

namespace CitiesTime.Tests
{
    [TestClass]
    public class RepositoryTest
    {
        private ICityRepository repo;
        private ILogRepository repoLog;
        private StandardKernel kernel = new StandardKernel();

        public RepositoryTest()
        {
            kernel.Bind<ICityRepository>().To<FakeCityRepository>();
            kernel.Bind<ILogRepository>().To<FakeLogRepository>();
        }

        [TestInitialize]
        public void MyTestInitialize()
        {
            repo = kernel.Get<ICityRepository>();
            repoLog = kernel.Get<ILogRepository>();
        }

        [TestMethod]
        public void Get_All_Cities()
        {
            //Arrange
            var cities = repo.GetCities();

            //Assert
            Assert.AreEqual<int>(3, cities.Count);
            Assert.AreEqual<string>("Buenos Aires", cities[0].Name);
            Assert.IsNull(cities.Find(c => c.Name == "Auckland"));
        }

        [TestMethod]
        public void Get_City_By_ID()
        {
            //Arrange
            var city1 = repo.GetCityById(1);
            var city2 = repo.GetCityById(2);
            var city3 = repo.GetCityById(10);

            //Assert
            Assert.AreEqual<int>(1, city1.ID);
            Assert.AreEqual<string>("W. Europe Standard Time", city2.TimeZoneId);
            Assert.IsNull(city3);
        }

        [TestMethod]
        public void Get_List_Logs()
        {
            //Arrange
            var logs = repoLog.GetLogHistory();

            //Assert
            Assert.AreEqual<int>(3, logs.Count);
            Assert.AreEqual<int>(3, logs[2].ID);
            Assert.IsNull(logs.Find(l => l.ID == 20));
        }

        [TestMethod]
        [ExpectedException(typeof(NotImplementedException))]
        public void Cannot_Save_Because_IsNot_Implemented()
        {
            //Arrange
            var log = new RequestLog { ID = 1, CityID = 2, TimeRequest = DateTime.Today};
        
            //Assert
            repoLog.SaveRequestLog(log);
        }
    }

    public class FakeCityRepository : ICityRepository
    {
        private static List<City> cities = new List<City>() 
        {
            new City { ID=1, Name="Buenos Aires", TimeZoneId="Argentina Standard Time"},
            new City { ID=2, Name="Paris", TimeZoneId="W. Europe Standard Time"},
            new City { ID=3, Name="London", TimeZoneId="Greenwich Standard Time"}
        };
        public CitiesContext Context
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public List<City> GetCities()
        {
            return cities;
        }

        public City GetCityById(int id)
        {
            return cities.Find(c => c.ID == id);
        }
    }

    public class FakeLogRepository : ILogRepository
    {
        private static List<RequestLog> logs = new List<RequestLog>() 
        {
            new RequestLog { CityID=1, ID=1, TimeRequest=DateTime.Today},
            new RequestLog { CityID=1, ID=2, TimeRequest=DateTime.Today},
            new RequestLog { CityID=3, ID=3, TimeRequest=DateTime.Today}
        };
        public CitiesContext Context
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public void SaveRequestLog(RequestLog entity)
        {
            throw new NotImplementedException();
        }

        public List<RequestLog> GetLogHistory()
        {
            return logs;
        }
    }
}
