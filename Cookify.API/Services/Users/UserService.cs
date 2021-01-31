using Cookify.API.Models;
using Cookify.API.Models.Common;
using Cookify.API.Models.Enums;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Requests;
using Cookify.API.Models.Results;
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


        public async Task<ServiceResponse<RegisterUserResultEnum>> RegisterUser(AddUserRequest request)
        {
            try
            {
                var usersList = _userRepository.GetAllWhere(x => x.Login == request.Login);

                if (usersList == null)
                {
                    return ServiceResponse<RegisterUserResultEnum>.Failed();
                }
                else if (usersList.Any())
                {
                    return ServiceResponse<RegisterUserResultEnum>.Succeeded(RegisterUserResultEnum.LoginIsTaken);
                }


                await _userRepository.RegisterUser(new User
                {
                    Login = request.Login,
                    Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    ShoppingList = new ShoppingList 
                    { 
                        MainShoppingList = new List<string>(),
                        GeneratedShoppingList = new List<GeneratedShopping>()
                    },
                    MealsList = new List<Meal>(),
                    DailyMealsList = new List<DailyMeals>(),
                    IsActive = true
                });

                return ServiceResponse<RegisterUserResultEnum>.Succeeded(RegisterUserResultEnum.UserCreated);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse<RegisterUserResultEnum>.Failed();
            }
        }

        public User GetUser(string id)
        {
            try
            {
                return _userRepository.GetWhere(x => x.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return null;
            }
        }

        public ServiceResponse<GetUserAccountStatusResult> GetUserAccountStatus(string login, string password)
        {
            try
            {
                var usersList = _userRepository.GetAllWhere(x => x.Login == login);

                if (usersList == null || !usersList.Any())
                {
                    return ServiceResponse<GetUserAccountStatusResult>.Succeeded(new GetUserAccountStatusResult { AccountStatus = AccountStatusEnum.InvalidLoginOrPassword });
                }

                var user = usersList.FirstOrDefault(x => BCrypt.Net.BCrypt.Verify(password, x.Password));

                if (user == null)
                {
                    return ServiceResponse<GetUserAccountStatusResult>.Succeeded(new GetUserAccountStatusResult { AccountStatus = AccountStatusEnum.InvalidLoginOrPassword });
                }

                return ServiceResponse<GetUserAccountStatusResult>.Succeeded(new GetUserAccountStatusResult
                {
                    AccountStatus = user.IsActive
                        ? AccountStatusEnum.Valid
                        : AccountStatusEnum.InactiveAccount,
                    UserId = user.Id
                });
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse<GetUserAccountStatusResult>.Failed();
            }

           
        }
    }
}
