using Cookify.API.Models.Common;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Results;
using Cookify.API.Repositories.Users;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Services.Shopping
{
    public class ShoppingService : IShoppingService
    {
        private readonly ILogger _logger;
        private readonly IUserRepository _userRepository;

        public ShoppingService(ILogger<ShoppingService> logger, IUserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        public ServiceResponse AddProductToList(string userId, string productName)
        {
            try
            {
                var user = _userRepository.GetWhere(x => x.Id == userId);

                var result = _userRepository.AddProductToList(user.Id, productName);

                if(result == null)
                {
                    return ServiceResponse.Failed();
                }

                if(result.Count() == user.ShoppingList.MainShoppingList.Count + 1)
                {
                    return ServiceResponse.Succeeded();
                }
                else
                {
                    return ServiceResponse.Failed();
                }

            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse.Failed();
            }
        }

        public ServiceResponse RemoveProductFromList(string userId, string productName)
        {
            try
            {
                var user = _userRepository.GetWhere(x => x.Id == userId);

                var result = _userRepository.RemoveProductFromList(user.Id, productName);

                if (result == null)
                {
                    return ServiceResponse.Failed();
                }

                if (result.Count() == user.ShoppingList.MainShoppingList.Count - 1)
                {
                    return ServiceResponse.Succeeded();
                }
                else
                {
                    return ServiceResponse.Failed();
                }

            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse.Failed();
            }
        }

        public ServiceResponse<GetShoppingListForUserResult> GetShoppingListForUser(string id)
        {
            try
            {
                var result = _userRepository.GetShoppingListForUser(id);

                if (result == null || result.ShoppingList == null)
                {
                    return ServiceResponse<GetShoppingListForUserResult>.Failed();
                }

                return ServiceResponse<GetShoppingListForUserResult>.Succeeded(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse<GetShoppingListForUserResult>.Failed();
            }
        }
    }
}
