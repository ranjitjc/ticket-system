using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketSystem.Models
{
    [Table("users")]
    public class User
    {
        [Column("us_id")]
        public int Id { get; set; }

        [Required]
        [Column("us_username")]
        public string UserName { get; set; }

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

    }


    public class AuthUser
    {
        [Column("st_id")]
        public int Id { get; set; }

        [Required]
        [Column("st_name")]
        public string UserName { get; set; }

        [Column("st_sort_seq")]
        public string FullName { get; set; }

        public int IsAdmin { get; set; }

        public string AccessToken { get; set; }

        public DateTime ExpiresIn { get; set; }

        public string TokenType { get; set; }

    }
}