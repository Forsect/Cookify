using Cookify.API.Models.Repository;
using Cookify.API.Models.Results;
using Cookify.API.Models.Settings;
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

            var result = _users.FindOneAndUpdate(filter, update, new FindOneAndUpdateOptions<User> { ReturnDocument = ReturnDocument.After });

            return result?.ShoppingList;
        }


        public IEnumerable<string> RemoveProductFromList(string userId, string productName)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            var update = Builders<User>.Update.Pull(x => x.ShoppingList, productName);

            var result = _users.FindOneAndUpdate(filter, update, new FindOneAndUpdateOptions<User> { ReturnDocument = ReturnDocument.After });

            return result?.ShoppingList;
        }

    }
} 