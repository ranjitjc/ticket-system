﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.Domain
{
    [Table("users")]
    public class User
    {
        [Column("us_id")]
        public int Id { get; set; }

        [Required]
        [Column("us_username")]
        public string UserName { get; set; }

        [Required]
        [Column("us_password")]
        public string Password { get; set; }

        [Required]
        [Column("us_salt")]
        public int? Salt { get; set; }

        [Column("us_firstname")]
        public string FirstName { get; set; }

        [Column("us_lastname")]
        public string LastName { get; set; }

        [Column("us_email")]
        public string Email { get; set; }

        [Column("us_admin")]
        public int IsAdmin { get; set; }

        [Column("us_most_recent_login_datetime")]
        public DateTime RecentLoginTime { get; set; }

        public virtual ICollection<Ticket> ReportedTickets { get; set; }

        public virtual ICollection<Ticket> AssignedTickets { get; set; }

        public virtual ICollection<Ticket> LastUpdatedTickets { get; set; }

        public virtual ICollection<TicketPost> Posts { get; set; }

    }
}
