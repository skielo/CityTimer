using CitiesTime.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CitiesTime.WebUI.Models
{
    public class CityViewModel
    {
        private readonly List<City> _cities;

        public CityViewModel(List<City> cities)
        {
            _cities = cities;
        }

        [Display(Name="Selected City")]
        public int SelectedCityID { get; set; }
        
        /// <summary>
        /// This Method returns the list of Select Items to show in the DropDownList
        /// </summary>
        public IEnumerable<SelectListItem> CitiesItems
        {
            get { return DefaultValue.Concat(new SelectList(_cities, "ID", "Name")); }
        }

        /// <summary>
        /// This Method generates the first item to show in the DropDownList
        /// </summary>
        public IEnumerable<SelectListItem> DefaultValue
        {
            get { return Enumerable.Repeat(new SelectListItem { Value="-1", Text="Select a city"},count:1); }
        }
    }
}