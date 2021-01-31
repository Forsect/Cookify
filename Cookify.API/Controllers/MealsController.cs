using Clavis.API.Utilities;
using Cookify.API.Models.Requests;
using Cookify.API.Models.Settings;
using Cookify.API.Services.Meals;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Controllers
{
    [ApiController]
    [Route("/api/meals/[action]")]
    public class MealsController : ControllerBase
    {
        private readonly IMealsService _mealsService;
        private readonly IJwtTokenSettings _jwtTokenSettings;

        public MealsController(IMealsService mealsService, IJwtTokenSettings jwtTokenSettings)
        {
            _mealsService = mealsService;
            _jwtTokenSettings = jwtTokenSettings;
        }

        [HttpGet]
        public IActionResult GetMealsList()
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

            var result = _mealsService.GetMealsList(user.Id);

            return result.IsSuccess ? new OkObjectResult(result.Data) : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPost]
        public IActionResult AddMealToList([FromBody] AddMealRequest request)
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

            if (request == null || !request.IsValid)
            {
                return BadRequest();
            }

            var result = _mealsService.AddMealToList(user.Id, request);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpDelete]
        public IActionResult RemoveMealFromList([FromBody] RemoveMealRequest request)
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

            var result = _mealsService.RemoveMealFromList(user.Id, request.MealId);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPost]
        public IActionResult UpdateMealFromList([FromBody] UpdateMealRequest request)
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

            if (request == null || !request.IsValid)
            {
                return BadRequest();
            }

            var result = _mealsService.UpdateMealFromList(user.Id, request);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpGet]
        public IActionResult GetDailyMealsList()
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

            var result = _mealsService.GetDailyMealsList(user.Id);

            return result.IsSuccess ? new OkObjectResult(result.Data) : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPost]
        public IActionResult AddDailyMeal([FromBody] AddOrRemoveDailyMealRequest request)
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

            if (request == null || !request.IsValid)
            {
                return BadRequest();
            }

            var result = _mealsService.AddDailyMeal(user.Id, request);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpDelete]
        public IActionResult RemoveDailyMeal([FromBody] AddOrRemoveDailyMealRequest request)
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

            if (request == null || !request.IsValid)
            {
                return BadRequest();
            }

            var result = _mealsService.RemoveDailyMeal(user.Id, request);

            return result.IsSuccess ? new OkResult() : StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
