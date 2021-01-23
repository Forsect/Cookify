using Cookify.API.Models.Enums;

namespace Cookify.API.Models.Results
{
    public class GetUserAccountStatusResult
    {
        public AccountStatusEnum AccountStatus { get; set; }

        public string UserId { get; set; }
    }
}
