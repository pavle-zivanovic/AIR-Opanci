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
    public class ModelController : ControllerBase
    {
        private readonly ModelService modelService;

        public ModelController(ModelService _modelService)
        {
            modelService = _modelService;
        }

        [Route("CreateModel")]
        [HttpPost]
        public async Task<IActionResult> CreateModel([FromBody] Model model)
        {
            Model m = new Model 
            { 
              brand = model.brand,
              name = model.name,
              price = model.price,
              image = model.image,
              discount = model.discount,
              gender = model.gender
            };

            string res = await modelService.CreateModel(m);
            return Ok(res);
        }

        [Route("GetModelGender/{gender}")]
        [HttpGet]
        public async Task<IActionResult> GetModelGender(string gender)
        {
            var list = await modelService.GetModelGender(gender);
            return Ok(list);
        }
    }
}