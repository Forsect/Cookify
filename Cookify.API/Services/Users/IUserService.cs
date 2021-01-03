using Cookify.API.Models.Common;
using Cookify.API.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Services.Users
{
    public interface IUserService
    {
        ServiceResponse AddUser(AddUserRequest request);
    }
}
