using Cookify.API.Models.Common;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Requests;
using Cookify.API.Repositories.Users;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Services.Users
{
    public class UserService : IUserService
    {
        private readonly ILogger _logger;
        private readonly IUserRepository _userRepository;

        public UserService(ILogger<UserService> logger, IUserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
        }


        public ServiceResponse AddUser(AddUserRequest request)
        {
            try
            {
                _userRepository.Create(new User
                {
                    Email = request.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                });

                return ServiceResponse.Succeeded();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse.Failed();
            }
        }
    }
}
