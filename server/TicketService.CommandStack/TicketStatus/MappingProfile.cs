namespace TicketService.Controllers.Status
{
    using AutoMapper;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CommandStack.TicketStatus.Create.Command, Domain.TicketStatus>(MemberList.Source);
            CreateMap<Domain.TicketStatus, CommandStack.TicketStatus.Update.Command>().ReverseMap();
            CreateMap<Domain.TicketStatus, CommandStack.TicketStatus.Delete.Command>();
        }
    }
}