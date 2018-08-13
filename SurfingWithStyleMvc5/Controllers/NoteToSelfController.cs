using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SurfingWithStyleMvc5.Controllers
{
    public class NoteToSelfController : Controller
    {
        [ActionName("sloppy-rosetta-stone")]
        public ActionResult SloppyRosettaStone()
        {
            return View("SloppyRosettaStone");
        }

    }
}