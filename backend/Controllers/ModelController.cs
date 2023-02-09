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
        private readonly UserService userService;

        public ModelController(ModelService _modelService, UserService _userService)
        {
            modelService = _modelService;
            userService = _userService;
        }

        [Route("CreateModel")]
        [HttpPost]
        public async Task<IActionResult> CreateModel([FromBody] Model model)
        {

            var _m = await modelService.GetModelByUserID(model.user);

            if ( _m != null ) 
            {
                if ( _m.name == model.name )
                { 
                    return BadRequest(-1);
                }; 
            };


            Model m = new Model 
            { 
              brand = model.brand,
              name = model.name,
              type = model.type,
              price = model.price,
              items = model.items,
              image = model.image,
              discount = model.discount,
              gender = model.gender,
              user = model.user,
              users = model.users
            };

            string res = await modelService.CreateModel(m);

            var _model = await modelService.GetModelByName(model.name);

            var _user = await userService.GetUserByID(m.user);

            var modelID = new {
                id = _model.Id
            };

            _user.postedItems.Add(modelID.id);
            await userService.UpdateUser(_user.Id, _user);

            return Ok(modelID);
        }

        [Route("GetModelByName/{name}")]
        [HttpGet]
        public async Task<IActionResult> GetModelByName(string name)
        {
            var model = await modelService.GetModelByName(name);

            var _model = new 
            {
                id = model.Id
            };


            return Ok(_model);
        }


        [Route("GetModelGender/{gender}")]
        [HttpGet]
        public async Task<IActionResult> GetModelGender(string gender)
        {
            var list = await modelService.GetModelGender(gender);
            return Ok(list);
        }

        [Route("GetFavoriteOrPostedModels/{userID}/{input}")]
        [HttpGet]
        public async Task<IActionResult> GetFavoriteOrPostedModels(string userID, string input)
        {
            if(userID.Length < 24 || userID.Length > 24)
            {
                return BadRequest("Nevalidan userID!");
            }
            
            var modelsID = await userService.GetFavoriteOrPostedModels(userID, input);
            List<Model> models = new List<Model>();

            for(int i=0; i<modelsID.Count; i++)
            {
                var m = await modelService.GetModelByID(modelsID[i]);
                models.Add(m);
            }

            return Ok(models);
        }

        [Route("SearchModels/{searchtext}")]
        [HttpGet]
        public async Task<IActionResult> SearchModels(string searchtext)
        {
            var models = await modelService.SearchModels(searchtext);
            return Ok(models);
        }

        [Route("FilterModels/{categories}/{brands}/{price}/{gender}")]
        [HttpGet]
        public async Task<IActionResult> FilterModels(string categories, string brands, string price, string gender)
        {
            var models = await modelService.FilterModels(categories, brands, price, gender);
            return Ok(models);
        }

        [Route("GetAllModelsByUserID/{userID}")]
        [HttpGet]
        public async Task<IActionResult> GetAllModelsByUserID(string userID)
        {

            if(userID.Length < 24 || userID.Length > 24)
            {
                return BadRequest("Nevalidan userID!");
            }

            var models = await modelService.GetAllModelsByUserID(userID);

            return Ok(models);
        }
    }
}