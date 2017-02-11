using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.QueryStack.Ticket
{
    public class PostModel
    {
        public int Id { get; set; }

        public string PostType { get; set; }

        public DateTime PostDate { get; set; }

        public string UserName { get; set; }

        public string Comment { get; set; }

    }
}
