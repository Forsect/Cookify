using Cookify.API.Models.Common;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Results;
using Cookify.API.Repositories.Users;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
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

        public ServiceResponse<ShoppingList> GetShoppingListForUser(string id)
        {
            try
            {
                var result = _userRepository.GetShoppingListForUser(id);

                if (result == null)
                {
                    return ServiceResponse<ShoppingList>.Failed();
                }

                return ServiceResponse<ShoppingList>.Succeeded(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse<ShoppingList>.Failed();
            }
        }

        public ServiceResponse AddGeneratedShoppingToList(string userId, List<GeneratedShopping> generatedShopping)
        {
            try
            {
                var user = _userRepository.GetWhere(x => x.Id == userId);

                generatedShopping.ForEach(x => x.Id = ObjectId.GenerateNewId().ToString());

                var result = _userRepository.AddGeneratedShoppingToList(user.Id, generatedShopping);

                if (result == null)
                {
                    return ServiceResponse.Failed();
                }

                if (result.Count() == user.ShoppingList.GeneratedShoppingList.Count + generatedShopping.Count)
                {
                    return ServiceResponse.Succeeded();
                }
                else
                {
                    return ServiceResponse.Failed();
                }
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse.Failed();
            }
        }

        public ServiceResponse RemoveGeneratedShoppingFromList(string userId, string shoppingId)
        {
            try
            {
                var user = _userRepository.GetWhere(x => x.Id == userId);

                var result = _userRepository.RemoveGeneratedShoppingFromList(user.Id, shoppingId);

                if (result == null)
                {
                    return ServiceResponse.Failed();
                }

                //if (result.Count() == user.ShoppingList.GeneratedShoppingList.Count - 1)
                //{
                    return ServiceResponse.Succeeded();
                //}
                //else
                //{
                //    return ServiceResponse.Failed();
                //}

            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse.Failed();
            }
        }
    }
}
