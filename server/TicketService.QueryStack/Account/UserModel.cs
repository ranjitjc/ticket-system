using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.QueryStack.Account
{
    public class UserModel
    {

        public int Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public int IsAdmin { get; set; }

        public string AccessToken { get; set; }

        public DateTime ExpiresIn { get; set; }

        public string TokenType { get; set; }


    }
}
