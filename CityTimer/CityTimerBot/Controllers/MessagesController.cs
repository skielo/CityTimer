using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.Bot.Connector;
using Newtonsoft.Json;
using Microsoft.Bot.Builder.Dialogs;
using CityTimerBot.Models;
using System.Diagnostics;
using Microsoft.Bot.Builder.FormFlow;

namespace CityTimerBot
{
    [BotAuthentication]
    public class MessagesController : ApiController
    {

        internal static IDialog<object> MakeRoot()
        {
            return Chain.From(() => FormDialog.FromForm(PlaceTemplate.BuildPlaceForm))
                                    .Do(async (context, place) =>
                                    {
                                        try
                                        {
                                            var completed = await place;
                                            // Actually process the sandwich order...
                                            await context.PostAsync("Thanks");
                                        }
                                        catch (FormCanceledException<PlaceTemplate> e)
                                        {
                                            string reply;
                                            if (e.InnerException == null)
                                            {
                                                reply = $"You quit on {e.Last}--maybe you can finish next time!";
                                            }
                                            else
                                            {
                                                reply = "Sorry, I've had a short circuit.  Please try again.";
                                            }
                                            await context.PostAsync(reply);
                                        }
                                    });
        }

        /// <summary>
        /// POST: api/Messages
        /// receive a message from a user and send replies
        /// </summary>
        /// <param name="activity"></param>
        [ResponseType(typeof(void))]
        public virtual async Task<HttpResponseMessage> Post([FromBody] Activity activity)
        {
            if (activity != null)
            {
                // one of these will have an interface and process it
                try
                {
                    switch (activity.GetActivityType())
                    {
                        case ActivityTypes.Message:
                            await Conversation.SendAsync(activity, () => MakeRoot());
                            break;

                        case ActivityTypes.ConversationUpdate:
                        case ActivityTypes.ContactRelationUpdate:
                        case ActivityTypes.Typing:
                        case ActivityTypes.DeleteUserData:
                        case ActivityTypes.Ping:
                        default:
                            Trace.TraceError($"Unknown activity type ignored: {activity.GetActivityType()}");
                            break;
                    }
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
            return new HttpResponseMessage(System.Net.HttpStatusCode.Accepted);
        }
    }
}