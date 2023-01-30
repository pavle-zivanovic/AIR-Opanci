using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Models;
using Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FootwearController : ControllerBase
    {
        private readonly FootwearService footwearService;

        public FootwearController(FootwearService _footwearService)
        {
            footwearService = _footwearService;
        }

        [Route("CreateFootwear")]
        [HttpPost]
        public async Task<IActionResult> CreateFootwear([FromBody] Footwear footwear)
        {
            Footwear f = new Footwear 
            { 
              model = footwear.model,
              user = footwear.user, 
              size = footwear.size
            };

            string res = await footwearService.CreateFootwear(f);
            return Ok(res);
        }

        [Route("GetAllFootwear")]
        [HttpGet]
        public async Task<IActionResult> GetAllFootwear()
        {
            List<Footwear> list = new List<Footwear>();
            list = await footwearService.GetAllFootwear();

            return Ok(list);
        }

    }
}
