using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace SurfingWithStyleMvc5.Controllers
{
    public class GerminateController : ApiController
    {
        // GET: api/Germinator
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Germinator/5
        public HttpResponseMessage Get(string key, string mode, string seed)
        {
            var serializer = new JavaScriptSerializer();
            var germinator = new MusicMaker.Germinator(key, mode, seed);
            var result = serializer.Serialize(germinator.Notes);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(result, Encoding.UTF8, "text/json");
            return response;
        }

        // POST: api/Germinator
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Germinator/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Germinator/5
        public void Delete(int id)
        {
        }
    }
}
