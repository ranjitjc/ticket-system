using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.QueryStack.Project
{

    public class ProjectModel
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int IsActive { get; set; }

        public int IsDefault { get; set; }


    }
}
