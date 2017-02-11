using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.QueryStack.Ticket
{
    public class TicketDetail
    {
        public TicketModel Ticket { get; set; }

        public IList<TicketStatus.TicketStatusModel> Statuses { get; set; }

        public IList<Category.CategoryModel> Categories { get; set; }

        public IList<Project.ProjectModel> Projects { get; set; }

        public IList<Priority.PriorityModel> Priorities{ get; set; }

        
    }
}
