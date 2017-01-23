using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketService.Repository;
using System.Security.Claims;

namespace TicketService.QueryStack
{
    public class GetAccount
    {
        public class Query : IRequest<UserModel>
        {
            public string loginName { get; set; }
        }

        public class UserModel
        {
            public int Id { get; set; }

            public string UserName { get; set; }

            public string FullName { get; set; }

            public int IsAdmin { get; set; }

            public string AccessToken { get; set; }

            public DateTime ExpiresIn { get; set; }

            public string TokenType { get; set; }

        }

        public class QueryHandler : IAsyncRequestHandler<Query, UserModel>
        {
            private readonly IDatabaseService _context;
            private ILogger<QueryHandler> _logger;

            public QueryHandler(IDatabaseService context, ILogger<QueryHandler> logger)
            {
                _context = context;
                _logger = logger;
            }



            public async Task<UserModel> Handle(Query message)
            {

                var query = _context.Users.Where(a => a.UserName.ToLower() == message.loginName.ToLower())
                        .Select(userInDatabase => new UserModel
                        {
                            UserName = userInDatabase.UserName,
                            FullName = userInDatabase.FirstName + ' ' + userInDatabase.LastName,
                            IsAdmin = userInDatabase.IsAdmin,
                            AccessToken = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        });



                var sql = query.ToSql();
                _logger.LogInformation("AccountController:GetAccount:Query => " + sql);


                UserModel user = await query.SingleOrDefaultAsync();


                //ClaimsIdentity identity = new ClaimsIdentity(message.loginName.ToLower());
                //ClaimsPrincipal principal = new ClaimsPrincipal(identity);



                return user;
                
               


            }
        }
    }
}
