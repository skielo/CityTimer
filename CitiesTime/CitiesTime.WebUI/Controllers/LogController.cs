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
    public class LogController : Controller
    {
        ILogRepository repo;

        public LogController(ILogRepository rep)
        {
            repo = rep;
        }

        //
        // GET: /Log/

        public ActionResult Index()
        {
            List<LogViewModel> model = repo.GetLogHistory().ConvertAll<LogViewModel>((RequestLog rl) =>
            {
                return new LogViewModel { CityName=rl.RequestedCity.Name, RequestedTime=rl.TimeRequest};
            });
            return View(model);
        }
    }
}
