﻿using Cookify.API.Models.Repository;
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

        public void Create(User user) => _users.InsertOne(user);

        public List<User> GetAllWhere(Expression<Func<User, bool>> predicate)
            => _users.Find(predicate).ToList();

        public User GetById(string id) =>
            _users.Find(user => user.Id == id).FirstOrDefault();
        public User GetWhere(Expression<Func<User, bool>> predicate)
            => _users.Find(predicate)?.FirstOrDefault();

    }
}
