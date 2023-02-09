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

        private readonly ModelService modelService;

        public PurchaseController(PurchaseService _purchaseService, FootwearService _footwearService, UserService _userService,  ModelService _modelService)
        {
            purchaseService = _purchaseService;
            footwearService = _footwearService;
            userService = _userService;
            modelService = _modelService;
        }

        [Route("CreatePurchase")]
        [HttpPost]
        public async Task<IActionResult> CreatePurchase([FromBody] Purchase purchase)
        {
            Purchase p = new Purchase 
            { 
              user = purchase.user,
              footwear = purchase.footwear,
              date = purchase.date,
              cena = purchase.cena
            };

            string res = await purchaseService.CreatePurchase(p);
            for(int i=0; i<purchase.footwear.Count; i++){
                var f = await footwearService.GetFootwearByID(purchase.footwear[i]);
                f.status=true;
                await footwearService.UpdateFootwear(purchase.footwear[i], f);
            }

            var u = await userService.GetUserByID(purchase.user);
            u.items.Add(res);  
            await userService.UpdateUser(purchase.user, u);

            return Ok();
        }

        [Route("GetUserPurchase/{userID}")]
        [HttpGet]
        public async Task<IActionResult> GetUserPurchase(string userID)
        {
            if(userID.Length < 24 || userID.Length > 24)
            {
                return BadRequest("Nevalidan userID!");
            }

            var user = await userService.GetUserByID(userID);
            if(user == null)
            {
                return BadRequest("User ne postoji!");
            }

            var list = "".Select(o => new 
            {
                brand = "",
                name = "",
                type = "",
                image = "",
                size = "",
                date = "",
                price = 0
            }).ToList();

            foreach(string i in user.items)
            {
                var purchase = await purchaseService.GetPurchaseByID(i);
                string footwears = "";

                for(int j=0; j<purchase.footwear.Count; j++)
                {
                    var footwear = await footwearService.GetFootwearByID(purchase.footwear[j]);
                    footwears += j==purchase.footwear.Count-1 ? footwear.size : footwear.size + ", ";
                }
                
                var f = await footwearService.GetFootwearByID(purchase.footwear[0]);
                var model = await modelService.GetModelByID(f.model);

                list.Add(
                    new
                    {
                        brand = model.brand,
                        name = model.name,
                        type = model.type,
                        image = model.image,
                        size = footwears,
                        date = purchase.date,
                        price = purchase.cena
                    });
            }

            return Ok(list);
        }
    }
}