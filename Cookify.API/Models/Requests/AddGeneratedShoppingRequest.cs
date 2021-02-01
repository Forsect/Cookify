using Cookify.API.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Models.Requests
{
    public class AddGeneratedShoppingRequest
    {
        public List<GeneratedShopping> GeneratedShoppingsList { get; set; }
    }
}
