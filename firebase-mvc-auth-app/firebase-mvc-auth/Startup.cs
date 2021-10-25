using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace firebase_mvc_auth
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
            services.AddControllersWithViews();

            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(@"C:\Projects\SampleProjects\firebase-mvc-auth\firebase-mvc-auth\firebase-mvc-auth-app\firebase-mvc-auth\Authentication\FirebaseSetup\fir-demo-9063a-firebase-adminsdk-wwos4-f0b1ddaaf8.json")
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                 .AddJwtBearer(options =>
                 {
                     options.Authority = Configuration["Firebase:Authority"];
                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         ValidateIssuer = true,
                         ValidateAudience = true,
                         ValidateLifetime = true,
                         ValidateIssuerSigningKey = true,
                         ValidIssuer = Configuration["Firebase:Authority"],
                         ValidAudience = Configuration["Firebase:Audience"]
                     };
                     options.Events = new JwtBearerEvents
                     {
                         OnTokenValidated = context =>
                         {
                             //Add the access_token as a claim, as we may actually need it
                             if (context.SecurityToken is JwtSecurityToken accessToken)
                             {
                                 if (context.Principal.Identity is ClaimsIdentity identity)
                                 {
                                     identity.AddClaim(new Claim("username", accessToken.Claims.Where(x => x.Type == "email").Select(x => x.Value).FirstOrDefault()));
                                 }
                             }
                             return Task.CompletedTask;
                         }
                     };
                 });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
