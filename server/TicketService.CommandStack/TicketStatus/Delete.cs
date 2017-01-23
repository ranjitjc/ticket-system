using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using TicketService.Repository;
using Microsoft.Extensions.Logging;


namespace TicketService.CommandStack.TicketStatus
{
    public class Delete
    {

        public class Command : IRequest
        {
            [Required]
            public int Id { get; set; }

            public override string ToString()
            {
                return "Id:" + Id;
            }
        }

        public class CommandHandler : IAsyncRequestHandler<Command>
        {
            private readonly IDatabaseService _context;
            private ILogger<CommandHandler> _logger;
            public CommandHandler(IDatabaseService context, ILogger<CommandHandler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task Handle(Command message)
            {
                _logger.LogInformation("Handle:Command => " + message.ToString());

                var ticketStatus = await _context.TicketStatuses.FindAsync(message.Id);

                _context.TicketStatuses.Remove(ticketStatus);

                await _context.SaveAsync();
 
            }

        }
    }
}