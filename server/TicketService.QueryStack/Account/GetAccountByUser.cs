using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketService.Repository;

namespace TicketService.QueryStack.Account
{
    public class GetAccountByUser
    {
        public class Query : IRequest<Account.UserModel>
        {
            public string UserName { get; set; }
            public string Password { get; set; }
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
                var query = _context.Users.Where(a => a.UserName.ToLower() == message.UserName.ToLower());

                var sql = query.ToSql();
                _logger.LogInformation("AccountController:GetAccountByUser:Query => " + sql);

                var user = await query.SingleOrDefaultAsync();

                string encrypted;

                string password = user.Password;

                if (password.Length < 32) // if password in db is unencrypted
                {
                    encrypted = password; // in other words, unecrypted
                }
                else if (user.Salt == null || user.Salt == 0)
                {
                    encrypted = EncryptMD5(message.Password);
                }
                else
                {
                    encrypted = EncryptMD5(message.Password + Convert.ToString(user.Salt));
                }


                if (encrypted == user.Password)
                {
                    return Mapper.Map(user, new UserModel()); 
                }
                else
                {
                    return new UserModel();
                }
            }

        }


        private static string EncryptMD5(string s)
        {

            
            System.Text.StringBuilder sb;
            using (System.Security.Cryptography.HashAlgorithm alg =
                System.Security.Cryptography.MD5.Create())
            {
                byte[] byte_array = System.Text.Encoding.UTF8.GetBytes(s);
                byte[] byte_array2 = alg.ComputeHash(byte_array);

                
                sb = new System.Text.StringBuilder(byte_array2.Length);

                foreach (byte b in byte_array2)
                {
                    sb.AppendFormat("{0:X2}", b);
                }

            }

            return sb.ToString();
        }

    }
}

