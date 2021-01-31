using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Models.Requests
{
    public class AddOrRemoveProductFromListRequest
    {
        public string ProductName { get; set; }
    }
}
