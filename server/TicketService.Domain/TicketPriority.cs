using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.Domain
{
    [Table("priorities")]
    public class TicketPriority : IEntity
    {
        [Column("pr_id")]
        public int Id { get; set; }

        [Column("pr_name")]
        public string Name { get; set; }


        [Column("pr_sort_seq")]
        public int SortOrder { get; set; }

        [Column("pr_default")]
        public int IsDefault { get; set; }

        public virtual ICollection<Domain.Ticket> Tickets { get; set; }

    }
}
