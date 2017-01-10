using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TicketSystem.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/statuses")]
    public class StatusController : Controller
    {
        private readonly Data.TicketSystemContext _context;

        public StatusController(Data.TicketSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Models.TicketStatus>> Statuses()
        {
            return await _context.TicketStatuses.ToListAsync();
        }

    }
}