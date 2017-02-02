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
    public class GetReportedTickets
    {
        

        public class Query : IRequest<List<TicketModel>>
        {
            public int ReportedUser { get; set; }
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

                //var query = _context.Users
                //                .Include(i => i.ReportedTickets)
                //                .Where(w => w.Id == message.ReportedUser)
                //                .Select(s => s)
                //                .Take(message.Count)
                //                .OrderBy(o=> o.ReportedTickets.OrderByDescending( oc=> oc.ReportedDate))
                ;
                var query = _context.Ticket
                                .Where(w => w.ReportedUserId == message.ReportedUser)
                                .Take(message.Count)
                                .OrderByDescending(o => o.ReportedDate)
                            ;

                var sql = query.ToSql();
                _logger.LogInformation("GetTicketList:Query => " + sql);
                var result = await query.ToListAsync();

                return Mapper.Map(result, new List<TicketModel>());
            }


            //public async Task<List<TicketModel>> Handle(Query message)
            //{

            //    //var query = _context.Users
            //    //                .Include(i => i.ReportedTickets)
            //    //                .Where(w => w.Id == message.ReportedUser)
            //    //                .Select(s => s)
            //    //                .Take(message.Count)
            //    //                .OrderBy(o=> o.ReportedTickets.OrderByDescending( oc=> oc.ReportedDate))
            //                ;
            //    var query = _context.Ticket
            //                    .Where(w => w.ReportedUserId == message.ReportedUser)
            //                    .Take(message.Count)
            //                    .Select(d => new TicketModel
            //                    {
            //                        Id = d.Id,
            //                        Description = d.Description,
            //                        ApplicationURL = d.ApplicationURL,
            //                        ProjectId = d.ProjectId,
            //                        PriorityId = d.PriorityId,
            //                        OrganizationId = d.OrganizationId,
            //                        CategoryId = d.CategoryId,
            //                        StatusId = d.StatusId,
            //                        ReportedUserId = d.ReportedUserId,
            //                        AssignedUserId = d.AssignedUserId,
            //                        LastUpdatedUserId = d.LastUpdatedUserId,
            //                        LastUpdatedDate = d.LastUpdatedDate,
            //                        ReportedDate = d.ReportedDate
            //                    })
            //                    .OrderByDescending(o => o.ReportedDate)
            //                ;

            //    var sql = query.ToSql();
            //    _logger.LogInformation("GetTicketList:Query => " + sql);
            //    var result = await query.ToListAsync();


            //    return result;


            //    //return new List<TicketModel>();
            //}
        }
    }
}
