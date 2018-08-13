using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace SurfingWithStyleMvc5
{
    public class IncubateController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public HttpResponseMessage Get(string key, string mode, string notes, string drone)
        {
            var serializer = new JavaScriptSerializer();
            var notesList = serializer.Deserialize<IList<MusicMaker.Note>>(notes);
            var incubator = new MusicMaker.Incubator(key, mode, notesList, drone);
            var incubatorJson = serializer.Serialize(incubator);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(incubatorJson, Encoding.UTF8, "text/json");
            return response;
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}