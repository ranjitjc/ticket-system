using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace TicketService.Repository
{
    //public class TicketServiceContext : DbContext
    //{
    //    public TicketServiceContext(DbContextOptions<TicketServiceContext> options) : base(options)
    //    {
    //    }

    //    public DbSet<Domain.User> Users { get; set; }

    //    public DbSet<Domain.TicketStatus> TicketStatuses { get; set; }


    //    protected override void OnModelCreating(ModelBuilder modelBuilder)
    //    {
    //        modelBuilder.Entity<Domain.User>().ToTable("users");
    //        modelBuilder.Entity<Domain.TicketStatus>().ToTable("statuses");
    //    }
    //}



    public class TicketServiceContext : DbContext, IDatabaseService
    {
        public TicketServiceContext(DbContextOptions<TicketServiceContext> options) : base(options)
        {
        }

        public DbSet<Domain.User> Users { get; set; }

        public DbSet<Domain.TicketStatus> TicketStatuses { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Domain.User>().ToTable("users");
            modelBuilder.Entity<Domain.TicketStatus>().ToTable("statuses");
        }

        public async Task SaveAsync()
        {
            await this.SaveChangesAsync();
        }
    }
}