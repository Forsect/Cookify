using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cookify.API.Models.Settings;
using Microsoft.Extensions.Options;
using Cookify.API.Repositories.Users;
using Cookify.API.Services.Users;

namespace Cookify.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            RegisterSettings(ref services);
            RegisterServices(ref services);
            RegisterRepositories(ref services);

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Cookify.API", Version = "v1" });
            });

            services.AddCors(options =>
            {
                options.AddPolicy(AppSettings.CorsConfigurationName,
                    builder =>
                    {
                        builder.SetIsOriginAllowed(origin => true)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });

        }

        private void RegisterSettings(ref IServiceCollection services)
        {
            services.Configure<CookifyDatabaseSettings>(
                Configuration.GetSection(nameof(CookifyDatabaseSettings)));

            services.AddSingleton<ICookifyDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<CookifyDatabaseSettings>>().Value);
        }

        private void RegisterRepositories(ref IServiceCollection services)
        {
            services.AddSingleton<IUserRepository, UserRepository>();
        }

        private void RegisterServices(ref IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors(AppSettings.CorsConfigurationName);
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cookify.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
