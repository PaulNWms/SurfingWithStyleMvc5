using System.Web.Mvc;

namespace SurfingWithStyleMvc5.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [ActionName("about")]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View("About");
        }

        [ActionName("contact")]
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View("Contact");
        }
    }
}