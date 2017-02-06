using CityTimerBot.Common;
using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;

namespace CityTimerBot.Models
{
    public class LocationBL
    {
        public CityInfoResponse GetCityInfo(string city)
        {
            var responseData = new CityInfoResponse();
            //Call API to get city
            var clientHttp = new HttpClient { BaseAddress = new Uri(ConfigurationManager.AppSettings["GoogleBaseUrl"]), };
            var query = $"maps/api/place/autocomplete/json?input={city}&types=geocode&key={ConfigurationManager.AppSettings["PlacesToken"]}";
            var response = clientHttp.GetAsync(query).Result;
            PlaceDetails details = null;
            TimeZoneResponse tzDetails = null;
            long timestamp = 0;
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var placeResponse = JsonConvert.DeserializeObject<Predictions>(response.Content.ReadAsStringAsync().Result);
                if (placeResponse.status == "ZERO_RESULTS")
                    return responseData;
                //Assuming the first prediction is the most accurate
                query = $"maps/api/place/details/json?placeid={placeResponse.predictions[0].place_id}&key={ConfigurationManager.AppSettings["PlacesToken"]}";
                var detailResponse = clientHttp.GetAsync(query).Result;
                if (detailResponse.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    details = JsonConvert.DeserializeObject<PlaceDetails>(detailResponse.Content.ReadAsStringAsync().Result);
                }
            }
            //Call API to get current time
            if (details != null)
            {
                timestamp = DateTime.UtcNow.ToUnixTime();
                query = $"maps/api/timezone/json?location={details.result.geometry.location.lat},{details.result.geometry.location.lng}&timestamp={timestamp}&key={ConfigurationManager.AppSettings["TimeZoneToken"]}";
                var tzResponse = clientHttp.GetAsync(query).Result;
                if (tzResponse.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    tzDetails = JsonConvert.DeserializeObject<TimeZoneResponse>(tzResponse.Content.ReadAsStringAsync().Result);
                }
            }
            //Store request in FireBase
            if (tzDetails != null)
            {
                responseData.cityName = details.result.formatted_address;
                responseData.convertedRequestedTime = (timestamp + tzDetails.rawOffset + tzDetails.dstOffset).FromUnixTime().ToString("yyyy-MM-dd HH:mm");
                responseData.convertedLocalTime = timestamp.FromUnixTime().ToString("yyyy-MM-dd HH:mm");
                responseData.timeZoneId = tzDetails.timeZoneId;
                responseData.timeZoneName = tzDetails.timeZoneName;
                responseData.rawOffset = tzDetails.rawOffset;
                responseData.dstOffset = tzDetails.dstOffset;
            }

            try
            {
                var client = QueueClient.CreateFromConnectionString(ConfigurationManager.AppSettings["connectionString"], ConfigurationManager.AppSettings["queueName"]);
                var message = new BrokeredMessage(JsonConvert.SerializeObject(responseData));
                client.Send(message);
            }
            catch
            {
            }

            return responseData;
        }

        public CityInfoResponse GetCityInfoFromPlaceId(string placeId)
        {
            var responseData = new CityInfoResponse();
            //Call API to get city
            var clientHttp = new HttpClient { BaseAddress = new Uri(ConfigurationManager.AppSettings["GoogleBaseUrl"]), };
            var query = $"maps/api/place/details/json?placeid={placeId}&key={ConfigurationManager.AppSettings["PlacesToken"]}";
            var detailResponse = clientHttp.GetAsync(query).Result;
            PlaceDetails details = null;
            TimeZoneResponse tzDetails = null;
            long timestamp = 0;
            if (detailResponse.StatusCode == System.Net.HttpStatusCode.OK)
            {
                details = JsonConvert.DeserializeObject<PlaceDetails>(detailResponse.Content.ReadAsStringAsync().Result);
            }
            //Call API to get current time
            if (details != null)
            {
                timestamp = DateTime.UtcNow.ToUnixTime();
                query = $"maps/api/timezone/json?location={details.result.geometry.location.lat},{details.result.geometry.location.lng}&timestamp={timestamp}&key={ConfigurationManager.AppSettings["TimeZoneToken"]}";
                var tzResponse = clientHttp.GetAsync(query).Result;
                if (tzResponse.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    tzDetails = JsonConvert.DeserializeObject<TimeZoneResponse>(tzResponse.Content.ReadAsStringAsync().Result);
                }
            }
            //Store request in FireBase
            if (tzDetails != null)
            {
                responseData.cityName = details.result.formatted_address;
                responseData.convertedRequestedTime = (timestamp + tzDetails.rawOffset + tzDetails.dstOffset).FromUnixTime().ToString("yyyy-MM-dd HH:mm");
                responseData.convertedLocalTime = timestamp.FromUnixTime().ToString("yyyy-MM-dd HH:mm");
                responseData.timeZoneId = tzDetails.timeZoneId;
                responseData.timeZoneName = tzDetails.timeZoneName;
                responseData.rawOffset = tzDetails.rawOffset;
                responseData.dstOffset = tzDetails.dstOffset;
            }

            try
            {
                var client = QueueClient.CreateFromConnectionString(ConfigurationManager.AppSettings["connectionString"], ConfigurationManager.AppSettings["queueName"]);
                var message = new BrokeredMessage(JsonConvert.SerializeObject(responseData));
                client.Send(message);
            }
            catch
            {
            }

            return responseData;
        }

        public List<Tuple<string, string>> GetPlaces(string city)
        {
            var responseData = new List<Tuple<string, string>>();
            //Call API to get city
            var clientHttp = new HttpClient { BaseAddress = new Uri(ConfigurationManager.AppSettings["GoogleBaseUrl"]), };
            var query = $"maps/api/place/autocomplete/json?input={city}&types=geocode&key={ConfigurationManager.AppSettings["PlacesToken"]}";
            var response = clientHttp.GetAsync(query).Result;
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var placeResponse = JsonConvert.DeserializeObject<Predictions>(response.Content.ReadAsStringAsync().Result);
                if (placeResponse.status != "ZERO_RESULTS")
                {
                    for (int i = 0; i < placeResponse.predictions.Length; i++)
                    {
                        responseData.Add(new Tuple<string, string>(placeResponse.predictions[i].place_id, placeResponse.predictions[i].description));
                    }
                }
            }
            return responseData;
        }
    }
}
