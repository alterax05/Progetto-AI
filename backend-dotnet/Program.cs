using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.EntityFrameworkCore.Design;
using System.Diagnostics;

namespace Progetto_AI_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<ProgettoAIDbContext>(options =>
            {
                var configuration = builder.Configuration.GetConnectionString("DefaultConnection");
                options.UseMySql(configuration, new MariaDbServerVersion(new Version(10, 5, 21)));
            });


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)); // allow any origin
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapPost("/api/research", (RecensioneUtente recensione, ProgettoAIDbContext db) =>
            {
                db.Add(recensione);
                db.SaveChanges();
            });

            app.MapGet("/api/research", () =>
            {
                return "ciao";
            });

            app.Run();
        }
    }
}
