using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketService.Domain
{
    [Table("statuses")]
    public class TicketStatus
    {
        [Column("st_id")]
        public int Id { get; set; }

        [Required]
        [Column("st_name")]
        public string Name { get; set; }

        [Column("st_sort_seq")]
        public int SortOrder { get; set; }

        [Column("st_default")]
        public int IsDefault { get; set; }
    }
}