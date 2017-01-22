

namespace CityTimerBot.Models
{
    public class PlaceDetails
    {
        public Result result { get; set; }
        public string status { get; set; }
    }

    public class Result
    {
        public string formatted_address { get; set; }
        public Geometry geometry { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string place_id { get; set; }
    }

    public class Geometry
    {
        public Location location { get; set; }
    }

    public class Location
    {
        public float lat { get; set; }
        public float lng { get; set; }
    }
}
