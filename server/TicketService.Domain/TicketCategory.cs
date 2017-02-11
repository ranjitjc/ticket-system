using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.Domain
{
    [Table("categories")]
    public class TicketCategory : IEntity
    {
        [Column("ct_id")]
        public int Id { get; set; }

        [Column("ct_name")]
        public string Name { get; set; }

        [Column("ct_sort_seq")]
        public int SortOrder { get; set; }

        [Column("ct_default")]
        public int IsDefault { get; set; }

        public override string ToString()
        {
            return String.Format("{0} : {1}", Id ,Name);
        }

        public virtual ICollection<Domain.Ticket> Tickets { get; set; }


        #region Identity Management
        //public static bool operator ==(TicketCategory c1, TicketCategory c2)
        //{
        //    // Both null or same instance
        //    if (ReferenceEquals(c1, c2))
        //        return true;

        //    // Return false if one is null, but not both 
        //    if (((object)c1 == null) || ((object)c2 == null))
        //        return false;

        //    return c1.Equals(c2);
        //}
        //public static bool operator !=(TicketCategory c1, TicketCategory c2)
        //{
        //    return !(c1 == c2);
        //}

        //public override bool Equals(object obj)
        //{
        //    if (this == (TicketCategory)obj)
        //        return true;
        //    if (obj == null || GetType() != obj.GetType())
        //        return false;
        //    var other = (TicketCategory)obj;

        //    // Your identity logic goes here.  
        //    // You may refactor this code to the method of an entity interface 
        //    return Id == other.Id;
        //}

        //public override int GetHashCode()
        //{
        //    return Id.GetHashCode();
        //}
        #endregion
    }
}
