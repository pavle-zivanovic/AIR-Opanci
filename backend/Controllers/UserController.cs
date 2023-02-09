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

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] User user)
        {

            if (user.email == null){return BadRequest("Invalid entry");}
            
            var existing =  await userService.GetUserByEmail(user.email);

            if (existing == null){return BadRequest("Invalid email");}

            if (existing.password != user.password){ return BadRequest(-1);}

            var korisnik = new 
            {
                id = existing.Id
            };


            return Ok(korisnik);

        }

        [Route("CreateUser")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {

            if (user == null){return BadRequest("Invalid entry");}
            
            var existing =  await userService.GetUserByEmail(user.email);

            if (existing != null){return BadRequest("2");}

            User newUser = new User 
            { 
              firstname = user.firstname,
              lastname = user.lastname,
              email = user.email,
              password = user.password,
              address = user.address,
              phone = user.phone,
              items = user.items,
              favorites = user.favorites,
              postedItems = user.postedItems
            };

            string res = await userService.CreateUser(newUser);
            return Ok(1);
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

            if(model.items.Count != 0)
            {
                foreach(string i in model.items)
                {
                    await footwearService.DeleteFootwear(i);
                }
            }
            
            await modelService.DeleteModel(modelID);

            user.postedItems.Remove(modelID);
            user.favorites.Remove(modelID);
            string res = await userService.UpdateUser(userID, user);

            return Ok(1);
        }

        [Route("GetUser/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetUser(string id)
        {
            if(id.Length < 24 || id.Length > 24)
            {
                return BadRequest("Nevalidan user ID!");
            }

            User u = await userService.GetUserByID(id);

            if(u == null)
            {
                return BadRequest("Nepostojeci user!");
            }
            
            return Ok(u);
        }
    }
}