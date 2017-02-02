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
    public class GetAllTickets
    {
    
        public class Query : IRequest<IPagedList<TicketModel>>
        {
            public int Page { get; set; } = 1;

            public int PageSize { get; set; } = 15;

            public string SortBy { get; set; } = null;

        }

        public class QueryHandler : IAsyncRequestHandler<Query, IPagedList<TicketModel>>
        {
            private readonly IDatabaseService _context;
            private ILogger<QueryHandler> _logger;

            public QueryHandler(IDatabaseService context, ILogger<QueryHandler> logger)
            {
                _context = context;
                _logger = logger;
            }



            public async Task<IPagedList<TicketModel>> Handle(Query message)
            {

                var result = await _context.Ticket
                                .Include(i => i.Organization)
                                .Include(i => i.Category)
                                .Include(i => i.Project)
                                .Include(i => i.Priority)
                                .Include(i => i.Status)
                                .Include(i => i.ReportedUser)
                                .Include(i => i.AssignedUser)
                                .Include(i => i.LastUpdatedUser)
                                .ToPagedListAsync(message.Page, message.PageSize, message.SortBy,
                                    a => a.Id,                                // sortExpression
                                    Common.SortDirection.Descending,          // defaultSortDirection
                                    a => Mapper.Map(a, new TicketModel(a.ReportedUser.UserName, a.AssignedUser.UserName,a.LastUpdatedUser.UserName ) )); // selector

               

                _logger.LogInformation("GetAllTickets:Query => Succeeded.");

                return result;



            }
        }
    }
}
