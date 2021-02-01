using Cookify.API.Models.Common;
using Cookify.API.Models.Repository;
using Cookify.API.Models.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Services.Shopping
{
    public interface IShoppingService
    {
        ServiceResponse<ShoppingList> GetShoppingListForUser(string id);
        ServiceResponse AddProductToList(string userId, string productName);
        ServiceResponse RemoveProductFromList(string userId, string productName);
        ServiceResponse AddGeneratedShoppingToList(string userId, List<GeneratedShopping> generatedShopping);
        ServiceResponse RemoveGeneratedShoppingFromList(string userId, string shoppingId);
    }
}
