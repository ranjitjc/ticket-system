//using System.Collections.Generic;
//using System.Threading.Tasks;
//using MediatR;
//using TicketService.Repository;
//using Microsoft.EntityFrameworkCore;
//using System.Linq;
//using Microsoft.Extensions.Logging;

//namespace TicketService.QueryStack.TicketStatus
//{

//    public class Index
//    {
//        public class Query : IRequest<List<Model>>
//        {
//        }

//        public class Model
//        {
//            public string Name { get; set; }

//            public int IsDefault { get; set; }

//            public int SortOrder { get; set; }

//            public int Id { get; set; }
//        }

//        public class QueryHandler : IAsyncRequestHandler<Query, List<Model>>
//        {
//            private readonly TicketServiceContext _context;
//            private ILogger<TicketService.Controllers.StatusController> _logger;
            
//            public QueryHandler(TicketServiceContext context, ILogger<TicketService.Controllers.StatusController> logger)
//            {
//                _context = context;
//                _logger = logger;
//            }

       

//            public async Task<List<Model>> Handle(Query message)
//            {

//                /*
//                string query = @"
//                SELECT d.*, p.LastName + ', ' + p.FirstName AS [AdministratorFullName]
//                FROM Department d
//                LEFT OUTER JOIN Person p ON d.InstructorID = p.ID
//                WHERE d.DepartmentID = @p0";
//                Model department = await _context.Database.SqlQuery<Model>(query, message.Id).SingleOrDefaultAsync();

//                return department;
//                */
//                var query = _context.TicketStatuses.Select( a=> new Model {
//                                Id = a.Id,
//                                Name = a.Name,
//                                SortOrder = a.SortOrder,
//                                IsDefault = a.IsDefault
//                            });
//                var sql = query.ToSql();  
//                 _logger.LogInformation("StatusController:Index:Query => " + sql);

//                return await query.ToListAsync();
//            }
//        }
//    }
//}