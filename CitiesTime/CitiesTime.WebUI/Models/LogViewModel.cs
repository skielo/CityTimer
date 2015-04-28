using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CitiesTime.WebUI.Models
{
    public class LogViewModel
    {
        [Display(Name = "Requested City Name")]
        public string CityName { get; set; }
        [Display(Name="Requested DateTime")]
        public DateTime RequestedTime { get; set; }
    }
}