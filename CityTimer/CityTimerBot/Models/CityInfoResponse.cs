
namespace CityTimerBot.Models
{
    public class CityInfoResponse
    {
        public string cityName { get; set; }
        public string convertedLocalTime { get; set; }
        public string convertedRequestedTime { get; set; }
        public int dstOffset { get; set; }
        public int rawOffset { get; set; }
        public int timeAtLocation { get; set; }
        public string timeZoneId { get; set; }
        public string timeZoneName { get; set; }
        public string userName { get; set; }
    }
}
