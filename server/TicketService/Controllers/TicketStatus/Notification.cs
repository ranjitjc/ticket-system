using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using TicketService.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace TicketService.Controllers.Status
{
public class MessageReceivedFromUserNotification :INotification
{
    public DateTime SubmittedAt { get; set; }
    public string FullName { get; set; }
    public string EmailAddress { get; set; }
    public string Message { get; set; }
}


public class SaveUserMessage : IAsyncNotificationHandler<MessageReceivedFromUserNotification>
{
    
        private readonly TicketServiceContext _context;

            public SaveUserMessage(TicketServiceContext context)
            {
                _context = context;
            }
    public async Task Handle(MessageReceivedFromUserNotification notification)
    {
        // var userMessage = new UserMessage
        // {
        //     Received = notification.SubmittedAt,
        //     UserEmailAddress = notification.EmailAddress,
        //     UserFullName = notification.FullName
        // };
        // db.UserMessages.Add(userMessage);
         await _context.SaveChangesAsync();
    }
}

public class NotifySalesUserMessageReceived : IAsyncNotificationHandler<MessageReceivedFromUserNotification>
{
    public async Task Handle(MessageReceivedFromUserNotification notification)
    {
        //var mailMessage = new MailMessage(notification.EmailAddress, "you@yoursite.com");
       // mailMessage.Subject = "Contact from web site";
        //mailMessage.Body = notification.Message;
 
        //var smtp = new SmtpClient();
        //await smtp.SendMailAsync(mailMessage);
    }
}


}