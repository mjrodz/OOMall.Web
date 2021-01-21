using System.Collections.Generic;

namespace OOMALL.WEB.ViewModels
{
    public class HttpClientHelperRequest
    {
        public HttpClientHelperRequest()
        {
            Headers = new Dictionary<string, string>();
        }

        public string HttpMethod { get; set; }
        public string Url { get; set; }
        public Dictionary<string, string> Headers { get; set; }
        public string Content { get; set; }
    }
}
