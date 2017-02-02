namespace TicketService.QueryStack.Ticket
{
    using AutoMapper;

    public class TicketMappingProfile : Profile
    {
        public TicketMappingProfile()
        {
            CreateMap<Domain.Ticket, TicketModel>();
        }
    }
}