using CitiesTime.Domain.Entities;
using CitiesTime.Domain.Repository;
using System;
using System.Collections.Generic;


namespace CitiesTime.Domain.Abstract
{
    public interface ILogRepository
    {
        CitiesContext Context {get; set;}
        void SaveRequestLog(RequestLog entity);
        List<RequestLog> GetLogHistory();
    }
}
