namespace Cookify.API.Models.Settings
{
    public interface IJwtTokenSettings
    {
        int TokenValidTimeInMinutes { get; set; }

        string Issuer { get; set; }

        string TokenKey { get; set; }
    }

    public class JwtTokenSettings : IJwtTokenSettings
    {
        public int TokenValidTimeInMinutes { get; set; }

        public string Issuer { get; set; }

        public string TokenKey { get; set; }
    }
}
