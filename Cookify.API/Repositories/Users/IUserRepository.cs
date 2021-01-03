using Cookify.API.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Repositories.Users
{
    public interface IUserRepository
    {
        User GetById(string id);
        void Create(User user);
    }
}
