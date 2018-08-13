using SurfingWithStyleMvc5.ViewModels;
using System.Web.Mvc;

namespace SurfingWithStyleMvc5.Controllers
{
    public class PracticeController : Controller
    {
        public ActionResult Metronome()
        {
            return View();
        }

        public ActionResult ScheduledMetronome(string r = "", string s = "", string b = "", string t = "", string d = "", string e = "")
        {
            return RedirectToAction("scheduled-metronome", "Practice", new { r = r, s = s, b = b, t = t, d = d, e = e });
        }

        [HttpPost]
        [ActionName("scheduled-metronome")]
        public ActionResult ScheduledMetronomePost(string query = "")
        {
            if (ModelState.IsValid)
            {
                string[] q = query.Split('&');
                return RedirectToAction("scheduled-metronome", "Practice", new { r = q[0], s = q[1], b = q[2], t = q[3], d = q[4], e = q[5] });
            }
            else
            {
                return View("ScheduledMetronome");
            }
        }

        [HttpGet]
        [ActionName("scheduled-metronome")]
        public ActionResult ScheduledMetronomeGet(string r = "", string s = "", string b = "", string t = "", string d = "", string e = "")
        {
            MetronomeViewModel viewModel = new MetronomeViewModel();
            viewModel.RestString = r;
            viewModel.StartRoutineWithRestString = s;
            viewModel.EndExerciseWithBellString = b;

            if (t.Length > 0 || d.Length > 0 || e.Length > 0)
            {
                string[] tempos = t.Split('-');
                string[] durations = d.Split('-');
                string[] exercises = e.Split('-');

                for (int i = 0; i < tempos.Length; i++)
                {
                    MetronomeRow row = new MetronomeRow(tempos[i], durations[i], exercises[i]);
                    viewModel.Rows.Add(row);
                }
            }
            else
            {
                MetronomeRow row = new MetronomeRow();
                viewModel.Rows.Add(row);
            }

            return View("ScheduledMetronome", viewModel);
        }

        public ActionResult AcceleratingMetronome(string r = "", string s = "", string b = "", string t = "", string d = "", string e = "")
        {
            return RedirectToAction("accelerating-metronome", "Practice", new { r = r, s = s, b = b, t = t, d = d, e = e });
        }

        [HttpPost]
        [ActionName("accelerating-metronome")]
        public ActionResult AcceleratingMetronomePost(string query = "")
        {
            if (ModelState.IsValid)
            {
                string[] q = query.Split('&');
                return RedirectToAction("AcceleratingMetronome", "Practice", new { r = q[0], s = q[1], b = q[2], t = q[3], d = q[4], e = q[5] });
            }
            else
            {
                return View("AcceleratingMetronome");
            }
        }

        [HttpGet]
        [ActionName("accelerating-metronome")]
        public ActionResult AcceleratingMetronomeGet(string r = "", string s = "", string b = "", string t = "", string d = "", string e = "")
        {
            MetronomeViewModel viewModel = new MetronomeViewModel();
            viewModel.RestString = r;
            viewModel.StartRoutineWithRestString = s;
            viewModel.EndExerciseWithBellString = b;

            if (t.Length > 0 || d.Length > 0 || e.Length > 0)
            {
                string[] tempos = t.Split('-');
                string[] durations = d.Split('-');
                string[] exercises = e.Split('-');

                for (int i = 0; i < tempos.Length; i++)
                {
                    MetronomeRow row = new MetronomeRow(tempos[i], durations[i], exercises[i]);
                    viewModel.Rows.Add(row);
                }
            }
            else
            {
                MetronomeRow row = new MetronomeRow();
                viewModel.Rows.Add(row);
            }

            return View("AcceleratingMetronome", viewModel);
        }

        [ActionName("scheduled-metronome-presets")]
        public ActionResult ScheduledMetronomePresets()
        {
            return View("ScheduledMetronomePresets");
        }

        [ActionName("scheduled-metronome-help")]
        public ActionResult ScheduledMetronomeHelp()
        {
            return View("ScheduledMetronomeHelp");
        }
    }
}