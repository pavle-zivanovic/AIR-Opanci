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

        [Route("GetFootwearsByAvailableSize/{modelsID}")]
        [HttpGet]
        public async Task<IActionResult> GetFootwearsByAvailableSize(string modelsID)
        {
            var models = modelsID.Split(",");
            List<List<string>> list = new List<List<string>>(models.Length);

            for(int i=0; i < models.Length; i++)
            {
                var footwears = await footwearService.GetFootwearsByStatus(models[i], false);

                List<string> size = new List<string>();
                foreach(Footwear f in footwears)
                {
                    size.Add(f.size);
                }

                list.Add(size);
            }
            
            return Ok(list);
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

            if(f == null)
            {
                return BadRequest("Nepostojeci footwear!");
            }
            
            return Ok(f);
        }

        [Route("DeleteFootwearFromModel/{modelID}/{size}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteFootwearFromModel(string modelID, string size)
        {
            if(modelID.Length < 24 || modelID.Length > 24)
            {
                return BadRequest("Nevalidan modelID!");
            }

            var model = await modelService.GetModelByID(modelID);

            if(model == null)
            {
                return BadRequest("Nepostojeci model!");
            }

            var footwearsTrue = await footwearService.GetFootwearsByStatus(modelID, true);
            var footwearsFalse = await footwearService.GetFootwearsByStatus(modelID, false);

            //ne moze da se obrise ako ima samo 1 par obuce
            if(footwearsTrue.Count == 0 && footwearsFalse.Count == 1)
            {
                return BadRequest(-1);
            }

            foreach(string i in model.items)
            {
                var footwear = await footwearService.GetFootwearByID(i);
                if(footwear.status == false && footwear.size == size)
                {
                    model.items.Remove(i);
                    await footwearService.DeleteFootwear(i);
                    break;
                }
            }

            await modelService.UpdateModel(modelID, model);

            return Ok(0);
        }
    }
}
