using Cookify.API.Models.Common;
using Cookify.API.Models.Enums;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Requests;
using Cookify.API.Models.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Services.Users
{
    public interface IUserService
    {
        Task<ServiceResponse<RegisterUserResultEnum>> RegisterUser(AddUserRequest request);
        ServiceResponse<GetUserAccountStatusResult> GetUserAccountStatus(string login, string password);
        User GetUser(string id);
    }
}
