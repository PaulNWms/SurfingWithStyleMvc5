using System.Web.Optimization;
using Yahoo.Yui.Compressor.Web.Optimization;

namespace SurfingWithStyleMvc5
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-ui").Include(
                      "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Piano.css",
                      "~/Content/Site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                    "~/Content/themes/base/accordion.css",
                    "~/Content/themes/base/all.css",
                    "~/Content/themes/base/autocomplete.css",
                    "~/Content/themes/base/base.css",
                    "~/Content/themes/base/button.css",
                    "~/Content/themes/base/core.css",
                    "~/Content/themes/base/datepicker.css",
                    "~/Content/themes/base/dialog.css",
                    "~/Content/themes/base/draggable.css",
                    "~/Content/themes/base/menu.css",
                    "~/Content/themes/base/progressbar.css",
                    "~/Content/themes/base/resizable.css",
                    "~/Content/themes/base/selectable.css",
                    "~/Content/themes/base/selectmenu.css",
                    "~/Content/themes/base/slider.css",
                    "~/Content/themes/base/sortable.css",
                    "~/Content/themes/base/spinner.css",
                    "~/Content/themes/base/tabs.css",
                    "~/Content/themes/base/theme.css",
                    "~/Content/themes/base/tooltip.css"));

            var javaScriptConfig = new JavaScriptCompressorConfig();
            javaScriptConfig.ObfuscateJavascript = false;
            var javaScriptTransform = new YuiCompressorTransform(javaScriptConfig);

            bundles.Add(new Bundle("~/bundles/TimerLib").Include(
                        "~/Scripts/Timer/jquery.timer.js",
                        "~/Scripts/Timer/TimerHelper.js"));

            bundles.Add(new Bundle("~/bundles/Timer").Include(
                        "~/Scripts/Timer/Timer.js"));

            bundles.Add(new Bundle("~/bundles/Tic-Tac-Toe").Include(
                        "~/Scripts/TicTacToe/TicTacToeHelper.js",
                        "~/Scripts/TicTacToe/IState.js",
                        "~/Scripts/TicTacToe/IGame.js",
                        "~/Scripts/TicTacToe/State.js",
                        "~/Scripts/TicTacToe/TicTacToe.js"));

            bundles.Add(new Bundle("~/bundles/X-Mens-Morris").Include(
                        "~/Scripts/snap/snap.svg.js",
                        "~/Scripts/XMensMorris/XMensMorrisHelper.js",
                        "~/Scripts/XMensMorris/IState.js",
                        "~/Scripts/XMensMorris/IGame.js",
                        "~/Scripts/XMensMorris/State.js",
                        "~/Scripts/XMensMorris/XMensMorris.js"));

            bundles.Add(new Bundle("~/bundles/MIDI").Include(
                        "~/Scripts/MIDI/inc/shim/Base64.js",
                        "~/Scripts/MIDI/inc/shim/Base64binary.js",
                        "~/Scripts/MIDI/inc/shim/WebAudioAPI.js",
                        "~/Scripts/MIDI/js/midi/audioDetect.js",
                        "~/Scripts/MIDI/js/midi/gm.js",
                        "~/Scripts/MIDI/js/midi/loader.js",
                        "~/Scripts/MIDI/js/midi/plugin.audiotag.js",
                        "~/Scripts/MIDI/js/midi/plugin.webaudio.js",
                        "~/Scripts/MIDI/js/midi/plugin.webmidi.js",
                        "~/Scripts/MIDI/js/util/dom_request_xhr.js",
                        "~/Scripts/MIDI/js/util/dom_request_script.js"));

            bundles.Add(new Bundle("~/bundles/Metronome").Include(
                        "~/Scripts/moment.js",
                        "~/Scripts/Metronome/jquery-animate-css-rotate-scale.js",
                        "~/Scripts/Metronome/jquery-css-transform.js",
                        "~/Scripts/Metronome/Metronome.js"));
        }
    }
}
