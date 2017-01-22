using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketService.Repository;

namespace TicketService.QueryStack.TicketStatus
{
    public class GetTicketStatus
    {
        public class Query : IRequest<TicketStatusModel>
        {
            public int Id { get; set; }
        }

        public class QueryHandler : IAsyncRequestHandler<Query, TicketStatusModel>
        {
            private readonly IDatabaseService _context;
            private ILogger<QueryHandler> _logger;

            public QueryHandler(IDatabaseService context, ILogger<QueryHandler> logger)
            {
                _context = context;
                _logger = logger;
            }



            public async Task<TicketStatusModel> Handle(Query message)
            {

                var query = _context.TicketStatuses.Where(w => w.Id == message.Id).Select(a => new TicketStatusModel
                {
                    Id = a.Id,
                    Name = a.Name,
                    SortOrder = a.SortOrder,
                    IsDefault = a.IsDefault
                });
                var sql = query.ToSql();
                _logger.LogInformation("GetTicketStatus:Index:Query => " + sql);

                return await query.FirstOrDefaultAsync();
            }
        }


    }
}
