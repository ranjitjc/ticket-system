using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.Domain
{

    [Table("projects")]
    public class TicketProject : IEntity
    {
        [Column("pj_id")]
        public int Id { get; set; }

        [Column("pj_name")]
        public string Name { get; set; }


        [Column("pj_description")]
        public string Description{ get; set; }

        [Column("pj_default")]
        public int IsDefault { get; set; }

        [Column("pj_active")]
        public int IsActive { get; set; }

        public virtual ICollection<Domain.Ticket> Tickets { get; set; }

    }
}
