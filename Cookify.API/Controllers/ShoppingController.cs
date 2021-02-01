using Cookify.API.Utilities;
using Cookify.API.Models.Requests;
using Cookify.API.Models.Settings;
using Cookify.API.Services.Shopping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cookify.API.Models.Repository;

namespace Cookify.API.Controllers
{
    [ApiController]
    [Route("/api/shopping/[action]")]
    public class ShoppingController : ControllerBase
    {
        private readonly IShoppingService _shoppingService;
        private readonly IJwtTokenSettings _jwtTokenSettings;

        public ShoppingController(IShoppingService shoppingService, IJwtTokenSettings jwtTokenSettings)
        {
            _shoppingService = shoppingService;
            _jwtTokenSettings = jwtTokenSettings;
        }

        [HttpGet]
        public IActionResult GetShoppingListForUser([FromQuery] string id)
        {
            HttpContext.Request.Headers.TryGetValue(AppSettings.AuthenticationHeader, out var jwtValues);
            string jwtToken = jwtValues.FirstOrDefault();

            if (!JwtHelper.IsJwtValid(jwtToken, _jwtTokenSettings.TokenKey, _jwtTokenSettings.Issuer, out var user))
            {
                return Unauthorized();
            }

            if (user == null)
            {
                return Unauthorized();
            }

            var result = _shoppingService.GetShoppingListForUser(id ?? user.Id);

            return result.IsSuccess ? new OkObjectResult(result.Data) : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPost]
        public IActionResult AddProductToList([FromBody] AddOrRemoveProductFromListRequest request)
        {
            HttpContext.Request.Headers.TryGetValue(AppSettings.AuthenticationHeader, out var jwtValues);
            string jwtToken = jwtValues.FirstOrDefault();

            if (!JwtHelper.IsJwtValid(jwtToken, _jwtTokenSettings.TokenKey, _jwtTokenSettings.Issuer, out var user))
            {
                return Unauthorized();
            }

            if (user == null)
            {
                return Unauthorized();
            }

            var result = _shoppingService.AddProductToList(user.Id, request.ProductName);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpDelete]
        public IActionResult RemoveProductFromList([FromBody] AddOrRemoveProductFromListRequest request)
        {
            HttpContext.Request.Headers.TryGetValue(AppSettings.AuthenticationHeader, out var jwtValues);
            string jwtToken = jwtValues.FirstOrDefault();

            if (!JwtHelper.IsJwtValid(jwtToken, _jwtTokenSettings.TokenKey, _jwtTokenSettings.Issuer, out var user))
            {
                return Unauthorized();
            }

            if (user == null)
            {
                return Unauthorized();
            }

            var result = _shoppingService.RemoveProductFromList(user.Id, request.ProductName);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPost]
        public IActionResult AddGeneratedShoppingToList([FromBody] GeneratedShopping request)
        {
            HttpContext.Request.Headers.TryGetValue(AppSettings.AuthenticationHeader, out var jwtValues);
            string jwtToken = jwtValues.FirstOrDefault();

            if (!JwtHelper.IsJwtValid(jwtToken, _jwtTokenSettings.TokenKey, _jwtTokenSettings.Issuer, out var user))
            {
                return Unauthorized();
            }

            if (user == null)
            {
                return Unauthorized();
            }

            var result = _shoppingService.AddGeneratedShoppingToList(user.Id, request);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpDelete]
        public IActionResult RemoveGeneratedShoppingToList([FromBody] RemoveGeneratedShoppingRequest request)
        {
            HttpContext.Request.Headers.TryGetValue(AppSettings.AuthenticationHeader, out var jwtValues);
            string jwtToken = jwtValues.FirstOrDefault();

            if (!JwtHelper.IsJwtValid(jwtToken, _jwtTokenSettings.TokenKey, _jwtTokenSettings.Issuer, out var user))
            {
                return Unauthorized();
            }

            if (user == null)
            {
                return Unauthorized();
            }

            var result = _shoppingService.RemoveProductFromList(user.Id, request.MealId);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
