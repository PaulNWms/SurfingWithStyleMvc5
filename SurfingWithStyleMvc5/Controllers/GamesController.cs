using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SurfingWithStyleMvc5.Controllers
{
    public class GamesController : Controller
    {
        [ActionName("tic-tac-toe")]
        public ActionResult TicTacToe()
        {
            return View("TicTacToe");
        }

        [ActionName("naughts-and-crosses")]
        public ActionResult NaughtsAndCrosses()
        {
            return View("TicTacToe");
        }

        [ActionName("3-mens-morris")]
        public ActionResult _3MensMorris()
        {
            return View("3MensMorris");
        }
    }
}