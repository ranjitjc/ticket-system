namespace TicketService.Controllers.Status
{
    using AutoMapper;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.TicketStatus, QueryStack.TicketStatus.TicketStatusModel>();
            CreateMap<CommandStack.TicketStatus.Create.Command, Domain.TicketStatus>(MemberList.Source);
            //CreateMap<Department, Edit.Command>().ReverseMap();
            //CreateMap<Department, Delete.Command>();
        }
    }
}