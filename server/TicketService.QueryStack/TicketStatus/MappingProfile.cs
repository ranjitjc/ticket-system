namespace TicketService.QueryStack.TicketStatus
{
    using AutoMapper;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.TicketStatus, TicketStatusModel>();
        }
    }
}