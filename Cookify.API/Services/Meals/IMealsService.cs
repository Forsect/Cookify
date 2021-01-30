using Cookify.API.Models.Common;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Services.Meals
{
    public interface IMealsService
    {
        ServiceResponse<List<Meal>> GetMealsList(string userId);
        ServiceResponse AddMealToList(string userId, AddMealRequest addMealRequest);
        ServiceResponse RemoveMealFromList(string userId, string mealId);
        ServiceResponse UpdateMealFromList(string userId, UpdateMealRequest request);
    }
}
