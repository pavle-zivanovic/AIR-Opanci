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
        private readonly ModelService modelService;

        public FootwearController(FootwearService _footwearService, ModelService _modelService)
        {
            footwearService = _footwearService;
            modelService = _modelService;
        }

        [Route("CreateFootwear")]
        [HttpPost]
        public async Task<IActionResult> CreateFootwear([FromBody] Footwear footwear)
        {
            Footwear f = new Footwear 
            { 
              model = footwear.model,
              user = footwear.user, 
              size = footwear.size,
              status = footwear.status
            };

            string res = await footwearService.CreateFootwear(f);
            var model = await modelService.GetModelByID(footwear.model);
            model.items.Add(res);
            await modelService.UpdateModel(footwear.model, model);
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

        [Route("GetFootwearByID/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetFootwearByID(string id)
        {
            if(id.Length < 24 || id.Length > 24)
            {
                return BadRequest("Nevalidan footwearID!");
            }

            var f = await footwearService.GetFootwearByID(id);
            return Ok(f);
        }

        [Route("GetFootwearFromModel/{modelID}")]
        [HttpGet]
        public async Task<IActionResult> GetFootwearFromModel(string modelID)
        {
            if(modelID.Length < 24 || modelID.Length > 24)
            {
                return BadRequest("Nevalidan modelID!");
            }

            var f = await footwearService.GetFootwearFromModel(modelID);
            return Ok(f);
        }
    }
}
