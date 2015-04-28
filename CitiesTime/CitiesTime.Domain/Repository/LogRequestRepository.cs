using CitiesTime.Domain.Abstract;
using CitiesTime.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CitiesTime.Domain.Repository
{
    public class LogRequestRepository: ILogRepository
    {
        public ICitiesContext Context { get; set; }
        public LogRequestRepository(ICitiesContext cont)
        {
            Context = cont;
        }

        /// <summary>
        /// This Method save the log into the database.
        /// </summary>
        /// <param name="entity">The log entity to save.</param>
        public void SaveRequestLog(RequestLog entity)
        {
            Context.Requests.Add(entity);
            ((DbContext)Context).SaveChanges();
        }

        /// <summary>
        /// This Method returns a list of Logs from the database.
        /// </summary>
        /// <returns>List of Logs stored</returns>
        public List<RequestLog> GetLogHistory()
        {
            return Context.Requests.ToList();
        }
    }
}
