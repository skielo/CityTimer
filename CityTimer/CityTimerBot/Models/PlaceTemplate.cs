using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.FormFlow;
using Microsoft.Bot.Builder.FormFlow.Advanced;
using Microsoft.Bot.Connector;
using System;
using System.Threading.Tasks;

namespace CityTimerBot.Models
{

    [Serializable]
    [Template(TemplateUsage.NotUnderstood, "I do not understand \"{0}\".", "Try again, I don't get \"{0}\".")]
    public class PlaceTemplate
    {
        [Prompt("Name a place to know the current date-time {||}")]
        [Describe("Name of the place")]
        public string PlaceName { get; set; }
        [Prompt("Select a place {||}")]
        [Describe("Place to find the current date time")]
        public string SelectedPlace { get; set; }
        public static IForm<PlaceTemplate> BuildPlaceForm()
        {
            var logic = new LocationBL();
            OnCompletionAsyncDelegate<PlaceTemplate> process = async (context, state) =>
            {
                var businesLogic = new LocationBL();
                var response = businesLogic.GetCityInfoFromPlaceId(state.SelectedPlace);
                var reply = string.Empty;
                if (!string.IsNullOrEmpty(response.cityName) && !string.IsNullOrEmpty(response.convertedLocalTime))
                {
                    reply = $"Current date time at {response.cityName} is {response.convertedLocalTime}";
                }
                else
                {
                    reply = $"Sorry we could not find any location called {state.PlaceName}";
                }
                await context.PostAsync(reply);
            };
            var builder = new FormBuilder<PlaceTemplate>()
                        .Message("Welcome to the City Timer bot!")
                        .Field(nameof(PlaceName))
                        .Field(new FieldReflector<PlaceTemplate>(nameof(SelectedPlace))
                            .SetType(null)
                            .SetActive((state) =>
                            {
                                return string.IsNullOrEmpty(state.SelectedPlace);
                            })
                            .SetPrompt(new PromptAttribute("Please select one of the following options: {||}")
                            {
                                ChoiceStyle = ChoiceStyleOptions.Buttons

                            })
                            .SetDefine((state, field) =>
                            {
                                var result = logic.GetPlaces(state.PlaceName);
                                foreach (var item in result)
                                {
                                    field
                                        .AddDescription(item.Item1, item.Item2)
                                        .AddTerms(item.Item1, item.Item2);
                                }

                                return Task.FromResult(true);
                            }))
                            .OnCompletion(process);
            return builder.Build();
        }
    }
}
