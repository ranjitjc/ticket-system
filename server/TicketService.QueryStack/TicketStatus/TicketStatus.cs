using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.QueryStack.TicketStatus
{
    public class TicketStatusListModel
    {
        public string Name { get; set; }

        public int IsDefault { get; set; }

        public int SortOrder { get; set; }

        public int Id { get; set; }
    }

    public class TicketStatusModel
    {
        public string Name { get; set; }

        public int IsDefault { get; set; }

        public int SortOrder { get; set; }

        public int Id { get; set; }


    }
}
