using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Progetto_AI_API
{
    public class ProgettoAIDbContext : DbContext
    {
        public DbSet<RecensioneUtente>? RecensioniUtenti { get; set; }

        public ProgettoAIDbContext(DbContextOptions<ProgettoAIDbContext> options) : base(options)
        {
            Database.Migrate();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RecensioneUtente>().HasKey(l => l.ID);
        }
    }
}
