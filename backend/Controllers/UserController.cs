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

        public UserController(UserService _userService)
        {
            userService = _userService;
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
            
            var model = await modelService.GetModelByID(modelID);
            model.users.Add(userID);

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

            var model = await modelService.GetModelByID(modelID);
            model.users.Remove(userID);

            string res = await userService.UpdateUser(userID, user);
            res += await modelService.UpdateModel(modelID, model);
            return Ok(res);
        }
    }
}