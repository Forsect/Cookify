using Cookify.API.Models.Common;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Requests;
using Cookify.API.Repositories.Users;
using Cookify.API.Services.Shopping;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Services.Meals
{
    public class MealsService : IMealsService
    {
        private readonly ILogger _logger;
        private readonly IUserRepository _userRepository;

        public MealsService(ILogger<ShoppingService> logger, IUserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        public ServiceResponse<List<Meal>> GetMealsList(string userId)
        {
            try
            {
                var result = _userRepository.GetMealsList(userId);

                if (result == null)
                {
                    return ServiceResponse<List<Meal>>.Failed();
                }

                return ServiceResponse<List<Meal>>.Succeeded(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse<List<Meal>>.Failed();
            }

        }

        public ServiceResponse AddMealToList(string userId, AddMealRequest addMealRequest)
        {
            try
            {
                var user = _userRepository.GetWhere(x => x.Id == userId);

                var mealToAdd = new Meal
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Name = addMealRequest.Name,
                    Ingredients = addMealRequest.Ingredients,
                    Recipe = addMealRequest.Recipe,
                    AdditionalInfo = addMealRequest.AdditionalInfo
                };

                var result = _userRepository.AddMealToList(user.Id, mealToAdd);

                if (result == null)
                {
                    return ServiceResponse.Failed();
                }

                if (result.Count() == user.MealsList.Count + 1)
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

        public ServiceResponse RemoveMealFromList(string userId, string mealId)
        {
            try
            {
                var user = _userRepository.GetWhere(x => x.Id == userId);

                var result = _userRepository.RemoveMealFromList(user.Id, mealId);

                if (result == null)
                {
                    return ServiceResponse.Failed();
                }

                if (result.Count() == user.MealsList.Count - 1)
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

        public ServiceResponse UpdateMealFromList(string userId, UpdateMealRequest request)
        {
            try
            {

                var mealToUpdate = new Meal
                {
                    Id = request.Id,
                    Name = request.Name,
                    Ingredients = request.Ingredients,
                    Recipe = request.Recipe,
                    AdditionalInfo = request.AdditionalInfo
                };

                var result = _userRepository.UpdateMealFromList(userId, mealToUpdate);

                if (result == null)
                {
                    return ServiceResponse.Failed();
                }

                if (result.Name == request.Name
                    && result.Recipe == request.Recipe
                    && result.AdditionalInfo == request.AdditionalInfo
                    && result.Ingredients.SequenceEqual(request.Ingredients))
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
        public ServiceResponse<List<DailyMeals>> GetDailyMealsList(string userId)
        {
            try
            {
                var result = _userRepository.GetDailyMealsList(userId);

                if (result == null)
                {
                    return ServiceResponse<List<DailyMeals>>.Failed();
                }

                return ServiceResponse<List<DailyMeals>>.Succeeded(result);
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse<List<DailyMeals>>.Failed();
            }

        }

        public ServiceResponse AddDailyMeal(string userId, AddOrRemoveDailyMealRequest request)
        {
            try
            {
                var result = _userRepository.AddOrUpdateDailyMeal(userId, request);

                if (result == null)
                {
                    return ServiceResponse.Failed();
                }

                return ServiceResponse.Succeeded();
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex.ToString());
                return ServiceResponse.Failed();
            }
        }
        public ServiceResponse RemoveDailyMeal(string userId, AddOrRemoveDailyMealRequest request)
        {
            try
            {
                var result = _userRepository.RemoveDailyMeal(userId, request);

                if (result == null)
                {
                    return ServiceResponse.Failed();
                }

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
