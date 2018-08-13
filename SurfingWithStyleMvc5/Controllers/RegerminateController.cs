using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace SurfingWithStyleMvc5.Controllers
{
    public class RegerminateController : ApiController
    {
        // GET: api/regerminate
        public HttpResponseMessage Get(string key, string mode, string noteNames, string drone)
        {
            var germinator = new MusicMaker.Germinator();
            var notesList = germinator.Regerminate(key, mode, noteNames);
            var incubator = new MusicMaker.Incubator(key, mode, notesList, drone);
            var serializer = new JavaScriptSerializer();
            var incubatorJson = serializer.Serialize(incubator);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(incubatorJson, Encoding.UTF8, "text/json");
            return response;
        }
    }
}
