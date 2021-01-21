using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OOMALL.WEB.Services;
using OOMALL.WEB.ViewModels;
using System;
using System.Threading.Tasks;

namespace OOMALL.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactHistoryController : ControllerBase
    {

        private readonly ILogger<TransactHistoryController> _logger;
        private readonly HttpClientHelper _httpClientHelper;

        public TransactHistoryController(ILogger<TransactHistoryController> logger)
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
                    Url = "https://localhost:44358/api/Transactions",
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
    }
}
