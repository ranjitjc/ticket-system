using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.QueryStack.Ticket
{
    public class TicketModel
    {

        public int Id { get; set; }

        public string Description { get; set; }

        public int ReportedUserId { get; set; }

        public DateTime ReportedDate { get; set; }

        public int StatusId { get; set; }

        public int PriorityId { get; set; }

        public int OrganizationId { get; set; }

        public int CategoryId { get; set; }

        public int ProjectId { get; set; }

        public int AssignedUserId { get; set; }

        public int LastUpdatedUserId { get; set; }

        public DateTime LastUpdatedDate { get; set; }

        public string ApplicationURL { get; set; }

        public string ProjectName { get; set; }

        public string ReportedUserName { get; set; }

        public string AssignedUserName { get; set; }

        public string LastUpdatedUserName { get; set; }

        public string StatusName { get; set; }

        public string PriorityName { get; set; }

        public string CategoryName { get; set; }

        public string OrganizationName { get; set; }

        public TicketModel(string reportedUser, string assignedUser, string lastUpdatedUser)
        {
            ReportedUserName = reportedUser;
            AssignedUserName = assignedUser;
            LastUpdatedUserName = lastUpdatedUser;
        }

    }
}
