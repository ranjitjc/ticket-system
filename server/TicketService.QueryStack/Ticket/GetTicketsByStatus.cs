using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketService.Common;
using TicketService.Repository;

namespace TicketService.QueryStack.Ticket
{
    public enum TicketType
    {
        Assigned =0,
        Reported =1
    }

    public class GetTicketsByStatus
    {

        public class Query : IRequest<IList<TicketSummaryByStatus>>
        {
            public int UserId { get; set; }
            public TicketType Type { get; set; }
        }

        public class TicketSummaryByStatus
        {
            public string StatusName { get; set; }

            public int Count { get; set; }
        }


        public class QueryHandler : IAsyncRequestHandler<Query, IList<TicketSummaryByStatus>>
        {
            private readonly IDatabaseService _context;
            private ILogger<QueryHandler> _logger;

            public QueryHandler(IDatabaseService context, ILogger<QueryHandler> logger)
            {
                _context = context;
                _logger = logger;
            }



            public async Task<IList<TicketSummaryByStatus>> Handle(Query message)
            {

                /*
                 * var query = database.Posts    // your starting point - table in the "from" statement
   .Join(database.Post_Metas, // the source table of the inner join
      post => post.ID,        // Select the primary key (the first part of the "on" clause in an sql "join" statement)
      meta => meta.Post_ID,   // Select the foreign key (the second part of the "on" clause)
      (post, meta) => new { Post = post, Meta = meta }) // selection
   .Where(postAndMeta => postAndMeta.Post.ID == id);    // where statement
                 */

                var query = (message.Type == TicketType.Reported) ?
                            _context.Ticket.Where(w => w.ReportedUserId == message.UserId) :
                            _context.Ticket.Where(w => w.AssignedUserId == message.UserId);

                var result = await query
                                    .Join( _context.TicketStatuses, ticket=> ticket.StatusId, status=> status.Id , 
                                        (ticket, status) => new { Ticket = ticket, Status= status } )
                                    .GroupBy(gr => gr.Status.Name)
                                    .Select(s => new TicketSummaryByStatus{ StatusName= s.Key, Count = s.Count() })
                                    .ToListAsync();

  
                _logger.LogInformation("GetTicketsByStatus:Query => Succeeded.");

                return result;



            }
        }
    }
}
