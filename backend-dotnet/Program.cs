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

            app.MapGet("/api/research", (ProgettoAIDbContext db) =>
            {
                return db.RecensioniUtenti?.ToList();
            });

            app.MapGet("/api/research/relation-time-correctness", (ProgettoAIDbContext db) =>
            {
                List<RecensioneUtente> reviews = db.RecensioniUtenti?.ToList() ?? [];

                var relationTimeCorrectness = new RelationTimeCorrectness();

                var n = reviews.Count;
                var n1 = reviews.Count(r => r.Correct);
                var n2 = n - n1;

                var mean1 = reviews.Where(r => r.Correct).Average(r => r.ElapsedTime);
                var mean2 = reviews.Where(r => !r.Correct).Average(r => r.ElapsedTime);

                var mean = reviews.Average(r => r.ElapsedTime);

                var sumOfSquares = reviews.Sum(r => Math.Pow(r.ElapsedTime - mean, 2));
                var standardDeviation = Math.Sqrt(sumOfSquares / (n - 1));

                var pointBiserial = (mean1 - mean2) / standardDeviation * Math.Sqrt(n1 * n2 / Math.Pow(n, 2));
                
                relationTimeCorrectness.CorrelationValue = pointBiserial;
                
                reviews.Select(r => r.ElapsedTime).Distinct().ToList().ForEach(time =>
                {
                    var timeCorrectness = new TimeCorrectness();
                    timeCorrectness.Time = time;
                    timeCorrectness.Correctness = reviews.Where(r => r.ElapsedTime == time).All(r => r.Correct);
                    relationTimeCorrectness.TimeCorrectness.Add(timeCorrectness);
                });

                return relationTimeCorrectness;
            });

            app.MapGet("api/research/comparison-between-models", (ProgettoAIDbContext db) =>
            {
                string[] models = db.RecensioniUtenti?.Select(x => x.Model).Distinct().ToArray() ?? [];
                List<ComparisonModels> comparisons = [];
                foreach(var model in models)
                {
                    int total = db.RecensioniUtenti?.Count(x => x.Model == model) ?? 0;
                    int correct = db.RecensioniUtenti?.Count(x=> x.Model == model && x.Correct == true) ?? 0;
                    comparisons.Add(new ComparisonModels() { correct = correct, label=model, total=total });
                }
                return comparisons;
            });

            app.Run();
        }
    }
}
