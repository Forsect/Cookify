using Cookify.API.Models.Repository;
using Cookify.API.Models.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cookify.API.Repositories.Users
{
    public interface IUserRepository
    {
        User GetById(string id);
        Task RegisterUser(User user);
        List<User> GetAllWhere(Expression<Func<User, bool>> predicate);
        User GetWhere(Expression<Func<User, bool>> predicate);
        GetShoppingListForUserResult GetShoppingListForUser(string id);
        IEnumerable<string> AddProductToList(string userId, string productName);
        IEnumerable<string> RemoveProductFromList(string userId, string productName);

    }
}
