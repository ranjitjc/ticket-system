using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketService.Repository;
using System.Security.Claims;
using AutoMapper;

namespace TicketService.QueryStack.Account
{
    public class GetAccount
    {
        public class Query : IRequest<Account.UserModel>
        {
            public string loginName { get; set; }
        }

       

        public class QueryHandler : IAsyncRequestHandler<Query, Account.UserModel>
        {
            private readonly IDatabaseService _context;
            private ILogger<QueryHandler> _logger;

            public QueryHandler(IDatabaseService context, ILogger<QueryHandler> logger)
            {
                _context = context;
                _logger = logger;
            }


            public async Task<Account.UserModel> Handle(Query message)
            {

                var query = _context.Users.Where(a => a.UserName.ToLower() == message.loginName.ToLower());
                        
                var sql = query.ToSql();
                _logger.LogInformation("AccountController:GetAccount:Query => " + sql);


                var user = await query.SingleOrDefaultAsync();

                return Mapper.Map(user, new UserModel());

            }

            //public async Task<Account.UserModel> Handle(Query message)
            //{

            //    var query = _context.Users.Where(a => a.UserName.ToLower() == message.loginName.ToLower())
            //            .Select(userInDatabase => new Account.UserModel
            //            {
            //                UserName = userInDatabase.UserName,
            //                FullName = userInDatabase.FirstName + ' ' + userInDatabase.LastName,
            //                IsAdmin = userInDatabase.IsAdmin,
            //                Email = userInDatabase.Email
            //            });



            //    var sql = query.ToSql();
            //    _logger.LogInformation("AccountController:GetAccount:Query => " + sql);


            //    Account.UserModel user = await query.SingleOrDefaultAsync();


            //    return user;

            //}
        }
    }
}
