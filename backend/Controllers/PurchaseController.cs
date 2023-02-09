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
    public class PurchaseController : ControllerBase
    {
        private readonly PurchaseService purchaseService;

        private readonly FootwearService footwearService;

        private readonly UserService userService;

        public PurchaseController(PurchaseService _purchaseService, FootwearService _footwearService, UserService _userService)
        {
            purchaseService = _purchaseService;
            footwearService = _footwearService;
            userService = _userService;
        }

        [Route("CreatePurchase")]
        [HttpPost]
        public async Task<IActionResult> CreatePurchase([FromBody] Purchase purchase)
        {
            Purchase p = new Purchase 
            { 
              user = purchase.user,
              footwear = purchase.footwear,
              date = purchase.date
            };

            string res = await purchaseService.CreatePurchase(p);
            for(int i=0; i<purchase.footwear.Count; i++){
                var f = await footwearService.GetFootwearByID(purchase.footwear[i]);
                f.status=true;
                await footwearService.UpdateFootwear(purchase.footwear[i], f);
            }

            var u = await userService.GetUserByID(purchase.user);

            for(int i=0; i<purchase.footwear.Count; i++){
               u.items.Add(purchase.footwear[i]);
            }
            await userService.UpdateUser(purchase.user, u);

            return Ok();
        }

    }
}