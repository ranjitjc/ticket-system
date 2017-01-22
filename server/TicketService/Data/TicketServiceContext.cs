//using Microsoft.EntityFrameworkCore;

//namespace TicketService.Repository
//{
//    public class TicketServiceContext : DbContext
//    {
//        public TicketServiceContext(DbContextOptions<TicketServiceContext> options) : base(options)
//        {
//        }

//        public DbSet<Domain.TicketStatus> TicketStatuses { get; set; }


//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.Entity<Domain.TicketStatus>().ToTable("statuses");
//        }
//    }
//}