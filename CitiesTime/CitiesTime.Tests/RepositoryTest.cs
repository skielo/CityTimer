using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CitiesTime.Domain.Abstract;
using CitiesTime.WebUI.Controllers;
using Ninject;
using CitiesTime.Domain.Repository;
using CitiesTime.Domain.Entities;
using System.Collections.Generic;
using System.Data.Entity;

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
            kernel.Bind<ICityRepository>().To<CitiesRepository>();
            kernel.Bind<ILogRepository>().To<LogRequestRepository>();
            kernel.Bind<ICitiesContext>().To<FakeContext>();
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
            ((FakeContext)repo.Context).SetUp();
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
            ((FakeContext)repo.Context).SetUp();
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
            ((FakeContext)repo.Context).SetUp();
            var logs = repoLog.GetLogHistory();

            //Assert
            Assert.AreEqual<int>(5, logs.Count);
            Assert.AreEqual<int>(3, logs[2].ID);
            Assert.IsNull(logs.Find(l => l.ID == 20));
        }

        [TestMethod]
        [ExpectedException(typeof(NotImplementedException))]
        public void Cannot_Save_Because_IsNot_Implemented()
        {
            //Arrange
            ((FakeContext)repo.Context).SetUp();
            var log = new RequestLog { ID = 1, CityID = 2, TimeRequest = DateTime.Today};
        
            //Assert
            repoLog.SaveRequestLog(log);
        }
    }

    public class FakeContext : DbContext, ICitiesContext
    {
        public DbSet<City> Cities { get; set; }
        public DbSet<RequestLog> Requests { get; set; }

        public FakeContext()
        {

        }

        public void SetUp()
        {
            Cities.Add(new City { ID = 1, Name = "Buenos Aires", TimeZoneId = "Argentina Standard Time" });
            Cities.Add(new City { ID = 2, Name = "Paris", TimeZoneId = "W. Europe Standard Time" });
            Cities.Add(new City { ID = 3, Name = "London", TimeZoneId = "Greenwich Standard Time" });
            Requests.Add(new RequestLog { CityID = 1, ID = 1, TimeRequest = DateTime.Today });
            Requests.Add(new RequestLog { CityID = 1, ID = 2, TimeRequest = DateTime.Today });
            Requests.Add(new RequestLog { CityID = 3, ID = 3, TimeRequest = DateTime.Today });
        }

        public override int SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}
