using Microsoft.EntityFrameworkCore;

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

            app.MapGet("/api/research", (ProgettoAIDbContext db) =>
            {
                return db.RecensioniUtenti?.ToList();
            });

            app.MapGet("api/research/comparison", (ProgettoAIDbContext db) =>
            {
                ComparisonModels[] result = [..from recensioni in db.RecensioniUtenti
                                             group recensioni by recensioni.Model into modello
                                             select new ComparisonModels
                                             {
                                                 total = modello.Count(),
                                                 correct = modello.Count(row => row.Correct),
                                                 label = modello.Key
                                             }];

                return result;
            });

            app.MapGet("api/research/comparison/{model}", (ProgettoAIDbContext db, string model) =>
            {
                var result = from recensioni in db.RecensioniUtenti
                             where recensioni.Model == model
                             group recensioni by recensioni.OutputClass into output
                             select new ComparisonModels
                             {
                                 total = output.Count(),
                                 correct = output.Count(row => row.Correct),
                                 label = output.Key
                             };

                return result;
            });

            app.Run();
        }
    }
}
