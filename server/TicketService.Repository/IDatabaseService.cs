using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.Repository
{
    public interface IDatabaseService
    {
        DbSet<Domain.User> Users { get; set; }

        DbSet<Domain.TicketOrganization> TicketOrganization { get; set; }

        DbSet<Domain.TicketStatus> TicketStatuses { get; set; }

        DbSet<Domain.TicketCategory> TicketCategory { get; set; }

        DbSet<Domain.TicketPriority> TicketPriority { get; set; }

        DbSet<Domain.TicketProject> TicketProject { get; set; }

        DbSet<Domain.Ticket> Ticket { get; set; }

        Task SaveAsync();
    }
}
