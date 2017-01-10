using Microsoft.EntityFrameworkCore;

namespace TicketSystem.Data
{
    public class TicketSystemContext : DbContext
    {
        public TicketSystemContext(DbContextOptions<TicketSystemContext> options) : base(options)
        {
        }

        public DbSet<Models.TicketStatus> TicketStatuses { get; set; }


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.TicketStatus>().ToTable("statuses");
        }
    }
}