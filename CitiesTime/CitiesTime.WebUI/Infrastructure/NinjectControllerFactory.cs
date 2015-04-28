using CitiesTime.Domain.Abstract;
using CitiesTime.Domain.Repository;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CitiesTime.WebUI.Infrastructure
{
    public class NinjectControllerFactory : DefaultControllerFactory
    {
        private IKernel ninjectKernel;

        public NinjectControllerFactory()
        {
            ninjectKernel = new StandardKernel();
            this.AddBindings();
        }

        protected override IController GetControllerInstance(RequestContext requestContext, System.Type controllerType)
        {
            return controllerType == null ? null :
                (IController)ninjectKernel.Get(controllerType);
        }

        private void AddBindings()
        {
            ninjectKernel.Bind<ICityRepository>().To<CitiesRepository>();
            ninjectKernel.Bind<ILogRepository>().To<LogRequestRepository>();
        }
    }
}