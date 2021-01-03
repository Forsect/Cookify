using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Cookify.API.Utilities
{
    public static class RequestsHelper
    {
        public static bool HasRequiredFields(object request) =>
            request.GetType().GetProperties()
                .Where(prop => prop.GetCustomAttribute(typeof(RequiredAttribute)) != null)
                .All(p => !string.IsNullOrWhiteSpace(p.GetValue(request) as string));
    }
}
