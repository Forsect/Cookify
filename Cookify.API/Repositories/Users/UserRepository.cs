using Cookify.API.Models.Repository;
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

        public GetShoppingListForUserResult GetShoppingListForUser(string id)
        {
            var user = _users.Find(x => x.Id == id).FirstOrDefault();

            return new GetShoppingListForUserResult { UserLogin = user.Login, ShoppingList = user.ShoppingList };
        }

        public IEnumerable<string> AddProductToList(string userId, string productName)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.Push(x => x.ShoppingList, productName);

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.ShoppingList;
        }


        public IEnumerable<string> RemoveProductFromList(string userId, string productName)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.Pull(x => x.ShoppingList, productName);

            var result = _users.FindOneAndUpdateExtAfter(filter, update);

            return result?.ShoppingList;
        }

        public List<Meal> GetMealsList(string userId)
        {
            var user = _users.Find(x => x.Id == userId).FirstOrDefault();

            return user.MealsList;
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

    }
} 