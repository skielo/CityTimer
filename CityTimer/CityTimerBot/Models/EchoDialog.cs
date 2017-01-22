using Microsoft.Bot.Builder.Dialogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CityTimerBot.Models
{
    public class EchoChainDialog
    {
        public static readonly IDialog<string> dialog = Chain.PostToChain()
            .Select(msg => msg.Text)
            .Switch(
                new RegexCase<IDialog<string>>(new Regex("^help", RegexOptions.IgnoreCase), (context, txt) =>
                {
                    return Chain.Return("I am a simple bot dialog, just send me a location name and I will give your the current time at this location.");
                }),
                new DefaultCase<string, IDialog<string>>((context, txt) =>
                {
                    var businesLogic = new LocationBL();
                    string reply;
                    if (!string.IsNullOrEmpty(txt))
                    {
                        var response = businesLogic.GetCityInfo(txt);
                        if(!string.IsNullOrEmpty(response.cityName) && !string.IsNullOrEmpty(response.convertedLocalTime))
                        {
                            reply = $"Current date time at {response.cityName} is {response.convertedLocalTime}";
                        }
                        else
                        {
                            reply = $"Sorry we could not find any location called {txt}";
                        }
                    }
                    else
                    {
                        reply = "Please provide a location";
                    }
                    return Chain.Return(reply);
                }))
            .Unwrap()
            .PostToUser();
    }
}
