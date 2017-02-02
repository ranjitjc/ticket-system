using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace TicketService.Repository.SqlServer
{
    public class TicketServiceContext : DbContext, IDatabaseService
    {
        public TicketServiceContext(DbContextOptions<TicketServiceContext> options) : base(options)
        {
        }

        public DbSet<Domain.User> Users { get; set; }

        public DbSet<Domain.TicketOrganization> TicketOrganization { get; set; }

        public DbSet<Domain.TicketStatus> TicketStatuses { get; set; }

        public DbSet<Domain.TicketCategory> TicketCategory { get; set; }

        public DbSet<Domain.TicketPriority> TicketPriority { get; set; }

        public DbSet<Domain.TicketProject> TicketProject { get; set; }

        public DbSet<Domain.Ticket> Ticket { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Domain.User>().ToTable("users")
                .HasKey(k => k.Id);

            //modelBuilder.Entity<Domain.User>()
            //    .HasMany<Domain.Ticket>(a => a.Tickets)
            //    .WithOne( a=> a.AssignedUser).HasForeignKey(f => f.AssignedUserId);

            //modelBuilder.Entity<Domain.User>()
            //    .HasMany<Domain.Ticket>(a => a.Tickets)
            //    .WithOne(a => a.ReportedUser).HasForeignKey(f => f.ReportedUserId);

            modelBuilder.Entity<Domain.TicketStatus>().ToTable("statuses")
                .HasKey(k => k.Id);
            modelBuilder.Entity<Domain.TicketOrganization>().ToTable("orgs")
                .HasKey(k => k.Id);
            modelBuilder.Entity<Domain.TicketCategory>().ToTable("categories")
                .HasKey(k => k.Id);
            modelBuilder.Entity<Domain.TicketPriority>().ToTable("priorities")
                .HasKey(k => k.Id);
            modelBuilder.Entity<Domain.TicketProject>().ToTable("projects")
                .HasKey(k => k.Id);

            modelBuilder.Entity<Domain.User>()
                .HasMany(m=> m.ReportedTickets)
                .WithOne(w=> w.ReportedUser)
                .HasForeignKey(f=> f.ReportedUserId );

            modelBuilder.Entity<Domain.User>()
                .HasMany(m => m.AssignedTickets)
                .WithOne(w => w.AssignedUser)
                .HasForeignKey(f => f.AssignedUserId);

            modelBuilder.Entity<Domain.User>()
                .HasMany(m => m.LastUpdatedTickets)
                .WithOne(w => w.LastUpdatedUser)
                .HasForeignKey(f => f.LastUpdatedUserId);

            //modelBuilder.Entity<Domain.Ticket>().ToTable("bugs")
            //    .HasOne(o => o.ReportedUser )
            //    .WithMany( m=> m.Tickets)
            //    .HasForeignKey(d => d.ReportedUserId);

            modelBuilder.Entity<Domain.TicketStatus>()
                .HasMany(a => a.Tickets).WithOne(w => w.Status);

            modelBuilder.Entity<Domain.TicketCategory>()
               .HasMany(a => a.Tickets).WithOne(w => w.Category);

            modelBuilder.Entity<Domain.TicketPriority>()
               .HasMany(a => a.Tickets).WithOne(w => w.Priority);

            modelBuilder.Entity<Domain.TicketProject>()
               .HasMany(a => a.Tickets).WithOne(w => w.Project);

            modelBuilder.Entity<Domain.TicketOrganization>()
               .HasMany(a => a.Tickets).WithOne(w => w.Organization);


           // modelBuilder.Entity<Domain.Ticket>()
                //.Ignore(o => o.AssignedUser)
                //.Ignore(o => o.Status)
                //.Ignore(o => o.Category)
                //.Ignore(o => o.Priority)
                //.Ignore(o => o.Project)
                //.Ignore(o => o.Organization)
                //.Ignore(o => o.LastUpdatedUser)
                //;

        }

        public async Task SaveAsync()
        {
            await this.SaveChangesAsync();
        }
    }
}