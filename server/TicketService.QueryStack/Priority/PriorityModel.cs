using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.QueryStack.Priority
{

    public class PriorityModel
    {

        public int Id { get; set; }

        public string Name { get; set; }


        public int SortOrder { get; set; }

  
        public int IsDefault { get; set; }


    }
}
