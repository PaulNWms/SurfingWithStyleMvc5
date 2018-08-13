using System.Web.Mvc;
using System.Web.Routing;

namespace SurfingWithStyleMvc5
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Note to Self",
                url: "note-to-self/{action}/{id}",
                defaults: new { controller = "NoteToSelf", action = "sloppy-rosetta-stone", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
