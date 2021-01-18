namespace Cookify.API.Models.Requests
{
    public class LoginRequest
    {
        public string Login { get; set; }

        public string Password { get; set; }

        public bool IsValid => !string.IsNullOrWhiteSpace(Login) && !string.IsNullOrWhiteSpace(Password);
    }
}
