using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketService.Repository;

namespace TicketService.QueryStack.Ticket
{
    public class GetAssignedTickets
    {

        public class Query : IRequest<List<TicketModel>>
        {
            public int AssignedUser {get; set; }

            public int Count { get; set; } = 5;

        }

        public class QueryHandler : IAsyncRequestHandler<Query, List<TicketModel>>
        {
            private readonly IDatabaseService _context;
            private ILogger<QueryHandler> _logger;

            public QueryHandler(IDatabaseService context, ILogger<QueryHandler> logger)
            {
                _context = context;
                _logger = logger;
            }



            public async Task<List<TicketModel>> Handle(Query message)
            {

                var query = _context.Ticket
                               .Where(w => w.AssignedUserId == message.AssignedUser)
                               .Take(message.Count)
                               .OrderByDescending(o => o.ReportedDate)
                           ;

                var sql = query.ToSql();
                _logger.LogInformation("GetTicketList:Query => " + sql);
                var result = await query.ToListAsync();

                return Mapper.Map(result, new List<TicketModel>());

                

            }
        }
    }
}
