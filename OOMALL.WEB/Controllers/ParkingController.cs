using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OOMALL.WEB.Services;
using OOMALL.WEB.ViewModels;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace OOMALL.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ParkingController : ControllerBase
    {

        private readonly ILogger<ParkingController> _logger;
        private readonly HttpClientHelper _httpClientHelper;

        public ParkingController(ILogger<ParkingController> logger)
        {
            _logger = logger;
            _httpClientHelper = new HttpClientHelper();
        }

        [HttpGet]
        public async Task<object> GetAsync()
        {
            try
            {
                var httpClientHelperRequest = new HttpClientHelperRequest
                {
                    Url = "https://localhost:44358/api/Parking",
                    HttpMethod = "GET"
                };
                httpClientHelperRequest.Headers.Add("accept", "*/*");
                return await _httpClientHelper.SendAsync(httpClientHelperRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpPost("Request")]
        public async Task<object> RequestAsync(ParkRequest parkRequest)
        {
            try
            {
                var httpClientHelperRequest = new HttpClientHelperRequest
                {
                    Url = "https://localhost:44358/api/Parking/Request",
                    HttpMethod = "POST",
                    Content = JsonConvert.SerializeObject(parkRequest)
                };
                httpClientHelperRequest.Headers.Add("accept", "*/*");
                httpClientHelperRequest.Headers.Add("Content-Type", "application/json");
                return await _httpClientHelper.SendAsync(httpClientHelperRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

    }
}
