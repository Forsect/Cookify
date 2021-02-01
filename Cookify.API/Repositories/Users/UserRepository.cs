using Cookify.API.Models.Repository;
using Cookify.API.Models.Requests;
using Cookify.API.Models.Results;
using Cookify.API.Models.Settings;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cookify.API.Repositories.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(ICookifyDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public Task RegisterUser(User user) => _users.InsertOneAsync(user);

        public List<User> GetAllWhere(Expression<Func<User, bool>> predicate)
            => _users.Find(predicate).ToList();

        public User GetById(string id) =>
            _users.Find(user => user.Id == id).FirstOrDefault();

        public User GetWhere(Expression<Func<User, bool>> predicate)
            => _users.Find(predicate)?.FirstOrDefault();

        public ShoppingList GetShoppingListForUser(string id)
        {
            var user = _users.Find(x => x.Id == id).FirstOrDefault();

            return user?.ShoppingList;
        }

        public IEnumerable<string> AddProductToList(string userId, string productName)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.Push(x => x.ShoppingList.MainShoppingList, productName);

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.ShoppingList?.MainShoppingList;
        }


        public IEnumerable<string> RemoveProductFromList(string userId, string productName)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.Pull(x => x.ShoppingList.MainShoppingList, productName);

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.ShoppingList?.MainShoppingList;
        }

        public List<Meal> GetMealsList(string userId)
        {
            var user = _users.Find(x => x.Id == userId).FirstOrDefault();

            return user?.MealsList;
        }

        public IEnumerable<Meal> AddMealToList(string userId, Meal meal)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.Push(x => x.MealsList, meal);

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.MealsList;
        }

        public IEnumerable<Meal> RemoveMealFromList(string userId, string mealId)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.PullFilter(x => x.MealsList, Builders<Meal>.Filter.Eq(x => x.Id, mealId));

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.MealsList;
        }

        public Meal UpdateMealFromList(string userId, Meal meal)
        {
            var filter = Builders<User>.Filter.Where(x => x.Id == userId && x.MealsList.Any(i => i.Id == meal.Id));
            var update = Builders<User>.Update
                .Set(x => x.MealsList[-1].Name, meal.Name)
                .Set(x => x.MealsList[-1].Ingredients, meal.Ingredients)
                .Set(x => x.MealsList[-1].Recipe, meal.Recipe)
                .Set(x => x.MealsList[-1].AdditionalInfo, meal.AdditionalInfo);

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.MealsList.FirstOrDefault(x => x.Id == meal.Id);
        }

        public List<DailyMeals> GetDailyMealsList(string userId)
        {
            var user = _users.Find(x => x.Id == userId).FirstOrDefault();

            return user?.DailyMealsList;
        }

        public IEnumerable<DailyMeals> AddOrUpdateDailyMeal(string userId, AddOrRemoveDailyMealRequest dailyMeal)
        {
            var userExists = _users.Find(x => x.Id == userId).FirstOrDefault();

            if (userExists == null) return null;

            var dateExists = userExists.DailyMealsList.FirstOrDefault(x => x.Date == dailyMeal.Date);

            FilterDefinition<User> filter;
            UpdateDefinition<User> update;
            User result;

            if (dateExists == null)
            {
                filter = Builders<User>.Filter.Eq(x => x.Id, userId);
                update = Builders<User>.Update.Push(x => x.DailyMealsList, new DailyMeals { Date = dailyMeal.Date, MealsList = new List<Meal> { dailyMeal.Meal } });
            }
            else
            {
                filter = Builders<User>.Filter.Where(x => x.Id == userId && x.DailyMealsList.Any(i => i.Date == dailyMeal.Date));
                update = Builders<User>.Update.Push(x => x.DailyMealsList[-1].MealsList, dailyMeal.Meal);
            }

            result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.DailyMealsList;
        }

        public IEnumerable<DailyMeals> RemoveDailyMeal(string userId, AddOrRemoveDailyMealRequest dailyMeal)
        {
            var filter = Builders<User>.Filter.Where(x => x.Id == userId && x.DailyMealsList.Any(i => i.Date == dailyMeal.Date));
            var update = Builders<User>.Update.PullFilter(x => x.DailyMealsList[-1].MealsList, Builders<Meal>.Filter.Eq(x => x.Id, dailyMeal.Meal.Id));

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            if (!result.DailyMealsList.FirstOrDefault(x => x.Date == dailyMeal.Date).MealsList.Any())
            {
                filter = Builders<User>.Filter.Eq(x => x.Id, userId);
                update = Builders<User>.Update.PullFilter(x => x.DailyMealsList, Builders<DailyMeals>.Filter.Eq(x => x.Date, dailyMeal.Date));

                var removeResult = _users.FindOneAndUpdateExtAfter(filter, update);
            }

            return result?.DailyMealsList;
        }

        public IEnumerable<GeneratedShopping> AddGeneratedShoppingToList(string userId, List<GeneratedShopping> generatedShopping)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.PushEach(x => x.ShoppingList.GeneratedShoppingList, generatedShopping);

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.ShoppingList?.GeneratedShoppingList;
        }

    public IEnumerable<GeneratedShopping> RemoveGeneratedShoppingFromList(string userId, string generatedShoppingId)
    {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.PullFilter(x => x.ShoppingList.GeneratedShoppingList, Builders<GeneratedShopping>.Filter.Eq(x => x.Id, generatedShoppingId));

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.ShoppingList?.GeneratedShoppingList;
        }
}
} 