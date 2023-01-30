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

    }
}