using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using TicketService.Repository;
using Microsoft.Extensions.Logging;


namespace TicketService.CommandStack.TicketStatus
{
    public class Update
    {
        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(m => m.Name).NotNull().Length(3, 50);
                RuleFor(m => m.SortOrder).GreaterThan(0);
                RuleFor(m => m.IsDefault).NotNull();
            }
        }

        public class Command : IRequest
        {

            [Required]
            public int Id { get; set; }

            [Required]
            [StringLength(50, MinimumLength = 3)]
            public string Name { get; set; }

            [Required]
            public int IsDefault { get; set; }

            [Required]
            public int SortOrder { get; set; }

            public override string ToString()
            {
                return "Name:{Name}" + Name;
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
                //Console.WriteLine();
                var status = Mapper.Map<Command, Domain.TicketStatus>(message);
                var newStatus = _context.TicketStatuses.Update(status);
                await _context.SaveAsync();
 
            }

        }
    }
}