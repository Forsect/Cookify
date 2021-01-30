using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Repositories
{
    public static class MongoExtensionMethods
    {
        public static T FindOneAndUpdateExtAfter<T>(this IMongoCollection<T> mongoCollection, FilterDefinition<T> filter, UpdateDefinition<T> update)
        {
            return mongoCollection.FindOneAndUpdate(filter, update, new FindOneAndUpdateOptions<T> { ReturnDocument = ReturnDocument.After });
        } 
    }
}
