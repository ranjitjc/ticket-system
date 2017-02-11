using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.Domain
{
    [Table("bug_posts")]
    public class TicketPost
    {
        [Column("bp_id")]
        public int Id { get; set; }

        [Column("bp_bug")]
        public int TicketId { get; set; }

        public Ticket Ticket { get; set; }

        [Column("bp_type")]
        public string PostType { get; set; }

        [Column("bp_user")]
        public int PostedBy { get; set; }

        public User PostedUser { get; set; }

        [Column("bp_date")]
        public DateTime PostDate { get; set; }

        [Column("bp_comment")]
        public string Comment { get; set; }

        [Column("bp_comment_search")]
        public string Search { get; set; }

        [Column("bp_email_from")]
        public string EmailFrom { get; set; }

        [Column("bp_email_to")]
        public string EmailTo { get; set; }

        [Column("bp_file")]
        public string FileName { get; set; }

        [Column("bp_size")]
        public int? FileSize { get; set; }

        [Column("bp_content_type")]
        public string FileContentType { get; set; }

        [Column("bp_parent")]
        public int? ParentPostId { get; set; }

        [Column("bp_email_cc")]
        public string EmailCC { get; set; }



    }
}