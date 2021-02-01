using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Cookify.API;
using Cookify.API.Models.Enums;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Requests;
using Cookify.API.Models.Settings;
using Cookify.API.Services.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Cookify.API.Controllers
{
    [ApiController]
    [Route("/api/authorization/[action]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IJwtTokenSettings _jwtTokenSettings;
        private readonly IUserService _userService;

        public AuthorizationController(
            IHttpContextAccessor httpContextAccessor, 
            IJwtTokenSettings jwtTokenSettings, 
            IUserService userService)
        {
            _httpContextAccessor = httpContextAccessor;
            _jwtTokenSettings = jwtTokenSettings;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> GetAccountStatus([FromBody] LoginRequest request)
        {
            if (request == null || !request.IsValid)
            {
                return BadRequest();
            }

            var getUserResult = _userService.GetUserAccountStatus(request.Login, request.Password);

            if (!getUserResult.IsSuccess)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

            if (getUserResult.Data.AccountStatus == AccountStatusEnum.Valid)
            {
                var user = _userService.GetUser(getUserResult.Data.UserId);
                await CreateAuthCookie(request.Login, user);
            }

            return Ok(getUserResult.Data.AccountStatus);
        }

        [HttpGet]
        public IActionResult GetJwtToken()
        {
            if (!_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_jwtTokenSettings.TokenKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(_httpContextAccessor.HttpContext.User.Claims),
                Expires = DateTime.UtcNow.AddMinutes(_jwtTokenSettings.TokenValidTimeInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _jwtTokenSettings.Issuer
            };

            var token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);

            var tokenString = tokenHandler.WriteToken(token);

            return Ok(tokenString);
        }

        [HttpPost]
        public async Task<IActionResult> LogoutUser()
        {
            await _httpContextAccessor.HttpContext.SignOutAsync();
            return Ok();
        }

        private Task CreateAuthCookie(string login, User user)
        {
            var claims = new[]
            {
                new Claim(ClaimNames.Id, user?.Id), 
                new Claim(ClaimNames.Login, login)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            return _httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
        }
    }
}