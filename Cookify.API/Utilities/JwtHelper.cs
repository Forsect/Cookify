using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Cookify.API;
using Cookify.API.Models.Repository;
using Microsoft.IdentityModel.Tokens;

namespace Cookify.API.Utilities
{
    public static class JwtHelper
    {
        public static bool IsJwtValid(string jwtToken, string tokenKey, string issuer, out User user)
        {
            user = null;

            try
            {
                if (string.IsNullOrWhiteSpace(jwtToken))
                {
                    return false;
                }

                var tokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = GetSymmetricSecurityKey(tokenKey),
                    ValidateLifetime = false,
                    ValidateAudience = false,
                    ValidateIssuer = true,
                    ValidIssuer = issuer
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var claims = tokenHandler.ValidateToken(jwtToken, tokenValidationParameters, out var securityInfo);

                user = new User
                {
                    Id = claims.FindFirstValue(ClaimNames.Id),
                    Login = claims.FindFirstValue(ClaimNames.Login)
                };

                return !JwtExpired(claims);
            }
            catch (Exception)
            {
                return false;
            }
        }

        private static SecurityKey GetSymmetricSecurityKey(string secretKey)
        {
            byte[] symmetricKey = Encoding.ASCII.GetBytes(secretKey);
            return new SymmetricSecurityKey(symmetricKey);
        }

        private static bool JwtExpired(ClaimsPrincipal claims)
        {
            string expirationTimestampString = claims.Claims.FirstOrDefault(x => x.Type == "exp")?.Value;

            if (string.IsNullOrWhiteSpace(expirationTimestampString))
            {
                return true;
            }

            var offset = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expirationTimestampString));

            return offset.DateTime < DateTime.UtcNow;
        }
    }
}
