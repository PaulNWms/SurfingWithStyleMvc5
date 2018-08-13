using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SurfingWithStyleMvc5
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest()
        {
            if (Context.Request.IsSecureConnection)
            {
                if (HttpContext.Current.Request.IsLocal)
                {
                    //Response.Redirect(Context.Request.Url.ToString().Replace("http://localhost:25885/", "https://localhost:44300/"));
                }
                else
                {
                    Response.Redirect(Context.Request.Url.ToString().Replace("https://", "http://"));
                }
            }
        }
    }
}
