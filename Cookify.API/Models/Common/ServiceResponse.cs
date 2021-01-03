using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cookify.API.Models.Common
{
    public class ServiceResponse
    {
        public bool IsSuccess { get; set; }

        public static ServiceResponse Succeeded()
            => new ServiceResponse
            {
                IsSuccess = true,
            };

        public static ServiceResponse Failed()
            => new ServiceResponse
            {
                IsSuccess = false
            };
    }

    public class ServiceResponse<T>
    {
        public bool IsSuccess { get; set; }

        public T Data { get; set; }

        public static ServiceResponse<T> Succeeded(T data)
            => new ServiceResponse<T>
            {
                IsSuccess = true,
                Data = data
            };

        public static ServiceResponse<T> Failed()
            => new ServiceResponse<T>
            {
                IsSuccess = false
            };
    }
}
