using SurfingWithStyleMvc5.ViewModels;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace SurfingWithStyleMvc5.Controllers
{
    public class CompositionController : Controller
    {
        [ActionName("germinator")]
        public ActionResult Germinator()
        {
            return View(new CompositionViewModel());
        }

        [HttpPost]
        [ActionName("incubator")]
        public ActionResult IncubatorPost(CompositionViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var client = new WebClient();
                client.Encoding = System.Text.Encoding.UTF8;
                var query = string.Format("{0}://{1}:{2}/api/incubate?key={3}&mode={4}&notes={5}&drone={6}",
                    Request.Url.Scheme,
                    Request.Url.Host,
                    Request.Url.Port,
                    viewModel.Key,
                    viewModel.Mode,
                    viewModel.GermJson,
                    viewModel.Drone);
                var variationsJson = client.DownloadString(query);
                var serializer = new JavaScriptSerializer();
                var incubator = serializer.Deserialize<MusicMaker.Incubator>(variationsJson);
                viewModel.SmoothSequences = incubator.SmoothSequences;
                viewModel.Retrograde = incubator.Retrograde;
                viewModel.Inverse = incubator.Inverse;
                viewModel.ChromaticInverse = incubator.ChromaticInverse;
                viewModel.SumTones = incubator.SumTones;
                viewModel.DifferenceTones = incubator.DifferenceTones;
                return View(viewModel);
            }
            else
            {
                return View(new CompositionViewModel());
            }
        }

        [HttpGet]
        [ActionName("incubator")]
        public ActionResult IncubatorGet()
        {
            return View(new CompositionViewModel());
        }

        [ActionName("instructions")]
        public ActionResult Instructions()
        {
            return View();
        }
    }
}