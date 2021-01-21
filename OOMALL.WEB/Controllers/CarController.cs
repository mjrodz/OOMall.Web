using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OOMALL.WEB.Services;
using OOMALL.WEB.ViewModels;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace OOMALL.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {

        private readonly ILogger<CarController> _logger;
        private readonly HttpClientHelper _httpClientHelper;

        public CarController(ILogger<CarController> logger)
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
                    Url = "https://localhost:44358/api/CarCategories",
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

        [HttpPost("Park")]
        public async Task<object> PostAsync(CarParkRequest content)
        {
            try
            {
                var httpClientHelperRequest = new HttpClientHelperRequest
                {
                    Url = "https://localhost:44358/api/Car/Park",
                    HttpMethod = "POST",
                    Content = JsonConvert.SerializeObject(content)
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

        [HttpPost("Update")]
        public async Task<object> UpdateAsync(CarUpdateRequest carUpdateRequest)
        {
            try
            {
                var httpClientHelperRequest = new HttpClientHelperRequest
                {
                    Url = "https://localhost:44358/api/Car/Unpark",
                    HttpMethod = "PUT",
                    Content = JsonConvert.SerializeObject(carUpdateRequest)
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
