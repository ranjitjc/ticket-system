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

        DbSet<Domain.TicketStatus> TicketStatuses { get; set; }

        Task SaveAsync();
    }
}
