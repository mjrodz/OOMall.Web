using OOMALL.WEB.ViewModels;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace OOMALL.WEB.Services
{
    public class HttpClientHelper
    {
        public async Task<string> SendAsync(HttpClientHelperRequest httpClientHelperRequest)
        {
            using var httpClient = new HttpClient();
            using var request = new HttpRequestMessage(new HttpMethod(httpClientHelperRequest.HttpMethod), httpClientHelperRequest.Url);

            if (!string.IsNullOrWhiteSpace(httpClientHelperRequest.Content))
            {
                request.Content = new StringContent(httpClientHelperRequest.Content);
            }

            foreach (KeyValuePair<string, string> entry in httpClientHelperRequest.Headers)
            {
                if (entry.Key == "Content-Type")
                {
                    if (request.Content != null)
                        request.Content.Headers.ContentType = MediaTypeHeaderValue.Parse(entry.Value);
                }
                else
                {
                    request.Headers.TryAddWithoutValidation(entry.Key, entry.Value);
                }
            }

            var response = await httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}
