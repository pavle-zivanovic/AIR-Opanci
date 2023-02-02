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
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        private readonly ModelService modelService;

        private readonly FootwearService footwearService;

        public UserController(UserService _userService, ModelService _modelService, FootwearService _footwearService)
        {
            userService = _userService;
            modelService = _modelService;
            footwearService = _footwearService;
        }

        [Route("CreateUser")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            User u = new User 
            { 
              firstname = user.firstname,
              lastname = user.lastname,
              email = user.email,
              password = user.password,
              address = user.address,
              phone = user.phone
            };

            string res = await userService.CreateUser(u);
            return Ok(res);
        }

        [Route("LikeTheModel/{userID}/{modelID}")]
        [HttpPut]
        public async Task<IActionResult> LikeTheModel(string userID, string modelID)
        {
            if(userID.Length < 24 || userID.Length > 24)
            {
                return BadRequest("Nevalidan userID!");
            }

            if(modelID.Length < 24 || modelID.Length > 24)
            {
                return BadRequest("Nevalidan modelID!");
            }

            var user = await userService.GetUserByID(userID);
            user.favorites.Add(modelID);

            if(user == null)
            {
                return BadRequest("Nepostojeci user!");
            }
            
            var model = await modelService.GetModelByID(modelID);
            model.users.Add(userID);

            if(model == null)
            {
                return BadRequest("Nepostojeci model!");
            }

            string res = await userService.UpdateUser(userID, user);
            res += await modelService.UpdateModel(modelID, model);
            return Ok(res);
        }

        [Route("UnlikeTheModel/{userID}/{modelID}")]
        [HttpPut]
        public async Task<IActionResult> UnlikeTheModel(string userID, string modelID)
        {
            if(userID.Length < 24 || userID.Length > 24)
            {
                return BadRequest("Nevalidan userID!");
            }

            if(modelID.Length < 24 || modelID.Length > 24)
            {
                return BadRequest("Nevalidan modelID!");
            }

            var user = await userService.GetUserByID(userID);
            user.favorites.Remove(modelID);

            if(user == null)
            {
                return BadRequest("Nepostojeci user!");
            }

            var model = await modelService.GetModelByID(modelID);
            model.users.Remove(userID);

            if(model == null)
            {
                return BadRequest("Nepostojeci model!");
            }

            string res = await userService.UpdateUser(userID, user);
            res += await modelService.UpdateModel(modelID, model);
            return Ok(res);
        }

        [Route("DeleteModel/{userID}/{modelID}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteModel(string userID, string modelID)
        {
            if(userID.Length < 24 || userID.Length > 24)
            {
                return BadRequest("Nevalidan userID!");
            }

            if(modelID.Length < 24 || modelID.Length > 24)
            {
                return BadRequest("Nevalidan modelID!");
            }

            var user = await userService.GetUserByID(userID);

            if(user == null)
            {
                return BadRequest("Nepostojeci user!");
            }

            //ako vrati 0 onda user nije postavio taj model i ne moze da brise tudji model
            if(user.postedItems.Contains(modelID) == false)
            {
                return Ok(0);
            }

            var model = await modelService.GetModelByID(modelID);

            if(model == null)
            {
                return BadRequest("Nepostojeci model!");
            }

            for(int i=0; i<model.items.Count; i++)
            {
                await footwearService.DeleteFootwear(model.items[i]);
            }

            await modelService.DeleteModel(modelID);

            user.postedItems.Remove(modelID);
            string res = await userService.UpdateUser(userID, user);

            return Ok(res);
        }
    }
}