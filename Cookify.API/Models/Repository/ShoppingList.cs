using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Models.Repository
{
    public class ShoppingList
    {
        public List<string> MainShoppingList { get; set; }
        public List<GeneratedShopping> GeneratedShoppingList { get; set; }

    }

    public class GeneratedShopping
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public List<string> Ingredients { get; set; }
    }
}
