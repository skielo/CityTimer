using CitiesTime.Domain.Abstract;
using CitiesTime.Domain.Entities;
using CitiesTime.WebUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CitiesTime.WebUI.Controllers
{
    public class CityController : Controller
    {
        ICityRepository cityRepo;
        ILogRepository logRepo;

        public CityController(ICityRepository rep, ILogRepository repLog)
        {
            cityRepo = rep;
            logRepo = repLog;
        }

        //
        // GET: /City/

        public ActionResult Index()
        {
            return View(new CityViewModel(cityRepo.GetCities()));
        }

        //
        // GET: /City/ValidateAddress/

        public ActionResult ValidateAddress()
        {
            return View();
        }

        //
        // GET: /City/GetLocalTime/{Id}

        public ActionResult GetLocalTime(int id)
        {
            City _city = cityRepo.GetCityById(id);
            var dt = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, _city.TimeZoneId);
            logRepo.SaveRequestLog(new RequestLog { CityID=_city.ID, TimeRequest=DateTime.Now});
            var ret = new { Date=dt.ToShortDateString(), Hour=dt.ToShortTimeString() };
            return Json(ret, JsonRequestBehavior.AllowGet);
        }
    }
}
