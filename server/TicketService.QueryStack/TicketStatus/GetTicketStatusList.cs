using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using TicketService.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace TicketService.QueryStack.TicketStatus
{

    public class GetTicketStatusList
    {
        public class Query : IRequest<List<TicketStatusModel>>
        {
        }

        public class QueryHandler : IAsyncRequestHandler<Query, List<TicketStatusModel>>
        {
            private readonly IDatabaseService _context;
            private ILogger<QueryHandler> _logger;

            public QueryHandler(IDatabaseService context, ILogger<QueryHandler> logger)
            {
                _context = context;
                _logger = logger;
            }



            public async Task<List<TicketStatusModel>> Handle(Query message)
            {

                /*
                string query = @"
                SELECT d.*, p.LastName + ', ' + p.FirstName AS [AdministratorFullName]
                FROM Department d
                LEFT OUTER JOIN Person p ON d.InstructorID = p.ID
                WHERE d.DepartmentID = @p0";
                Model department = await _context.Database.SqlQuery<Model>(query, message.Id).SingleOrDefaultAsync();

                return department;
                */
                var query = _context.TicketStatuses.Select(a => new TicketStatusModel
                {
                    Id = a.Id,
                    Name = a.Name,
                    SortOrder = a.SortOrder,
                    IsDefault = a.IsDefault
                });
                var sql = query.ToSql();
                _logger.LogInformation("GetTicketStatusList:Query => " + sql);

                return await query.ToListAsync();
            }
        }
    }
}