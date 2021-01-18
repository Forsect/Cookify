using Cookify.API.Models.Repository;
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
        void Create(User user);
        List<User> GetAllWhere(Expression<Func<User, bool>> predicate);
        User GetWhere(Expression<Func<User, bool>> predicate);
    }
}
