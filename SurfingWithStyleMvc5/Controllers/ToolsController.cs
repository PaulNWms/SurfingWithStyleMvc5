using SurfingWithStyleMvc5.ViewModels;
using System.Web.Mvc;

namespace SurfingWithStyleMvc5.Controllers
{
    public class ToolsController : Controller
    {
        [HttpPost]
        [ActionName("timer")]
        public ActionResult TomatoTimerPost(TimerViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                return RedirectToAction("Timer", "Tools", new { duration = viewModel.Duration });
            }
            else
            {
                return View("Timer", viewModel);
            }
        }

        [HttpGet]
        [ActionName("1-minute-timer")]
        public ActionResult Timer1MinGet(string duration = "PT1M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("2-minute-timer")]
        public ActionResult Timer2MinGet(string duration = "PT2M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("egg-timer")]
        public ActionResult EggTimerGet(string duration = "PT3M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("5-minute-timer")]
        public ActionResult Timer5MinGet(string duration = "PT5M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("10-minute-timer")]
        public ActionResult Timer10MinGet(string duration = "PT10M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("15-minute-timer")]
        public ActionResult Timer15MinGet(string duration = "PT15M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("20-minute-timer")]
        public ActionResult Timer20MinGet(string duration = "PT20M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("tomato-timer")]
        public ActionResult TomatoTimerGet(string duration = "PT25M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("30-minute-timer")]
        public ActionResult Timer30MinGet(string duration = "PT30M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("45-minute-timer")]
        public ActionResult Timer45MinGet(string duration = "PT45M")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("1-hour-timer")]
        public ActionResult Timer1HourGet(string duration = "PT1H")
        {
            return TimerGet(duration);
        }

        [HttpGet]
        [ActionName("timer")]
        public ActionResult TimerGet(string duration = "PT25M")
        {
            TimerViewModel viewModel = new TimerViewModel();
            viewModel.Duration = duration;
            return View("Timer", viewModel);
        }

        [ActionName("whats-my-ip")]
        public ActionResult WhatsMyIP()
        {
            return View("WhatsMyIP");
        }

        [ActionName("whats-my-ip),")]
        public ActionResult WhatsMyIPMisspelled()
        {
            return View("WhatsMyIP");
        }

        [ActionName("calculator")]
        public ActionResult Calculator()
        {
            return View("Calculator");
        }

        [ActionName("youtube-comment-finder")]
        public ActionResult YouTubeCommentFinder()
        {
            return View("YouTubeCommentFinder");
        }
    }
}