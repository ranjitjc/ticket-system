using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.Domain
{

    [Table("bugs")]
    public class Ticket
    {
        [Column("bg_id")]
        public int Id { get; set; }

        [Column("bg_short_desc")]
        public string Description { get; set; }

        
        [Column("bg_reported_date")]
        public DateTime ReportedDate { get; set; }

        [Column("bg_status")]
        public int StatusId { get; set; }

        public virtual TicketStatus Status { get; set; }

        [Column("bg_priority")]
        public virtual int PriorityId { get; set; }

        public virtual TicketPriority Priority { get; set; }

        [Column("bg_org")]
        public virtual int OrganizationId { get; set; }

        public virtual TicketOrganization Organization { get; set; }

        [Column("bg_category")]
        public virtual int CategoryId { get; set; }
        public virtual TicketCategory Category { get; set; }

        [Column("bg_project")]
        public virtual int ProjectId { get; set; }

        public virtual TicketProject Project { get; set; }

        [Column("bg_last_updated_user")]
        public int LastUpdatedUserId { get; set; }

        public virtual User LastUpdatedUser { get; set; }

        [Column("bg_last_updated_date")]
        public DateTime LastUpdatedDate { get; set; }

        [Column("Application URL")]
        public string ApplicationURL { get; set; }

        [Column("bg_assigned_to_user")]
        public int AssignedUserId { get; set; }

        [Column("bg_reported_user")]
        public int ReportedUserId { get; set; }

        public virtual  User AssignedUser { get; set; }

        public virtual User ReportedUser { get; set; }

        public virtual ICollection<TicketPost> Posts { get; set; }

    }
}