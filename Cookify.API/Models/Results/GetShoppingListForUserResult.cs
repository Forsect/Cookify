using Cookify.API.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Models.Results
{
    public class GetShoppingListForUserResult
    {
        public string UserLogin { get; set; }
        public ShoppingList ShoppingList { get; set; }
    }
}
