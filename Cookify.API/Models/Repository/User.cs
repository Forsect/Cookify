using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Models.Repository
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public ShoppingList ShoppingList { get; set; }
        public List<Meal> MealsList { get; set; }
        public List<DailyMeals> DailyMealsList { get; set; }
        public bool IsActive { get; set; }
    }

    public class DailyMeals
    {
        public DateTime Date { get; set; }
        public List<Meal> MealsList { get; set; }
    }
}
