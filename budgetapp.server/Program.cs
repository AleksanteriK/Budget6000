using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BudgetappServer.Models;
using BudgetappServer.Services;

namespace budgetapp.server;

public partial class Program
{
    public static void Main(string[] args)
    {
        //hakee envifilun
        DotNetEnv.Env.TraversePath().Load();

        var connectionString = System.Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING");
        var JWT_secretKey = System.Environment.GetEnvironmentVariable("JWT_SECRET_KEY");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new Exception("Connection string not found.");
        }

        if (string.IsNullOrEmpty(JWT_secretKey))
        {
            throw new Exception("Secret key for JWT not found.");
        }

        var builder = WebApplication.CreateBuilder(args);

        builder.Configuration.AddInMemoryCollection(new Dictionary<string, string>
        {
            {"BudgetappDatabase:ConnectionString", connectionString }
        });

        builder.Services.Configure<BudgetAppDatabaseSettings>
        (
            builder.Configuration.GetSection("BudgetappDatabase")
        );

        builder.Services.AddSingleton<Userservice>();
        builder.Services.AddControllers();

        var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                policy =>
                {
                    policy.SetIsOriginAllowed(origin =>
                    {
                        // Allow the production domain
                        if (origin == "https://budget.tonitu.dev")
                            return true;

                        // Allow localhost with any port
                        if (origin.StartsWith("http://localhost:") || origin.StartsWith("https://localhost:"))
                            return true;

                        return false;
                    })
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
        });

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
            .AddJwtBearer(options =>
            {
                //sallii http jos on development ymp�rist�ss�, muutoin https
                options.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
                    ValidAudience = builder.Configuration["JwtSettings:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWT_secretKey))
                };
            });

        var app = builder.Build();

        if (builder.Environment.IsDevelopment())
        {
            builder.WebHost.UseUrls("http://localhost:5000");
        }

        else
        {
            //vaatii https production ymprist�ss�
            app.UseHttpsRedirection();
        }

        app.UseAuthentication();

        app.UseAuthorization();

        app.UseCors(MyAllowSpecificOrigins);

        app.MapControllers();

        app.Run();
    }
}
