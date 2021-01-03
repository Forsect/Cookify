using Cookify.API.Models.Requests;
using Cookify.API.Services.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Controllers
{
    [ApiController]
    [Route("/api/user/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _usersService;

        public UserController(IUserService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        public IActionResult Test()
        {
            return Ok("test");
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] AddUserRequest request)
        {
            if (request == null || !request.IsValid)
            {
                return BadRequest();
            }

            var result =  _usersService.AddUser(request);

            return result.IsSuccess ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
