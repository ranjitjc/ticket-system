using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.Domain
{
    [Table("orgs")]
    public class TicketOrganization : IEntity
    {
        [Column("og_id")]
        public int Id { get; set; }

        [Column("og_name")]
        public string Name { get; set; }


        [Column("og_active")]
        public int IsActive { get; set; }

        public virtual ICollection<Domain.Ticket> Tickets { get; set; }

    }
}
