using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketService.Common;
using TicketService.Repository;

namespace TicketService.QueryStack.Ticket
{
    public class GetTicket
    {
    
        public class Query : IRequest<TicketDetail>
        {
            public int Id { get; set; }
        }

        public class QueryHandler : IAsyncRequestHandler<Query, TicketDetail>
        {
            private readonly IDatabaseService _context;
            private ILogger<QueryHandler> _logger;

            public QueryHandler(IDatabaseService context, ILogger<QueryHandler> logger)
            {
                _context = context;
                _logger = logger;
            }



            public async Task<TicketDetail> Handle(Query message)
            {

                var result = (message.Id > 0) ?
                                await _context.Ticket
                                    .Include(t => t.Posts)
                                        .ThenInclude(p => p.PostedUser)
                                    .Include(r => r.ReportedUser)
                                    .Where(w => w.Id == message.Id)
                                    .FirstOrDefaultAsync()
                                : new Domain.Ticket();

                //var result = 
                        //from b in _context.Ticket
                        //join pr in _context.TicketPriority on b.PriorityId equals pr.Id into BugPriority
                        //from bp in BugPriority.DefaultIfEmpty()
                        //join st in _context.TicketStatuses on b.StatusId equals st.Id into BugStatus
                        //from bs in BugStatus.DefaultIfEmpty()
                        //join pj in _context.TicketProject on b.ProjectId equals pj.Id into BugProject
                        //from bj in BugProject.DefaultIfEmpty()
                        //join ct in _context.TicketCategory on b.CategoryId equals ct.Id into BugCategory
                        //from bc in BugProject.DefaultIfEmpty()

                        //join ur in _context.Users on b.ReportedUserId equals ur.Id into BugReported
                        //from br in BugReported.DefaultIfEmpty()

                        //join ua in _context.Users on b.AssignedUserId equals ua.Id into BugAssigned
                        //from ba in BugAssigned.DefaultIfEmpty()

                        //join uu in _context.Users on b.LastUpdatedUserId equals uu.Id into BugUpdated
                        //from bu in BugUpdated.DefaultIfEmpty()
                        //select new
                        //{
                        //    b,
                            //Priority = bp,
                            //Status = bs,
                            //Project = bj,
                            //Category = bc,
                            //Reported = br,
                            //Assigned = ba,
                            //Updated = bu
                        //};




                _logger.LogInformation("GetTicket:Query => Succeeded.");

                TicketModel ticket = Mapper.Map(result, new TicketModel());

                //PostModel posts = Mapper.Map(result.Posts, new PostModel());


                ticket.ReportedUserName = result.ReportedUser.UserName;

                List<Priority.PriorityModel> priorities = await
                   _context.TicketPriority.Select(a => new Priority.PriorityModel
                   {
                       Id = a.Id,
                       Name = a.Name,
                       SortOrder = a.SortOrder,
                       IsDefault = a.IsDefault
                   }).ToListAsync();


                List<TicketStatus.TicketStatusModel> statuses = await
                    _context.TicketStatuses.Select(a => new TicketStatus.TicketStatusModel
                    {
                    Id = a.Id,
                    Name = a.Name,
                    SortOrder = a.SortOrder,
                    IsDefault = a.IsDefault
                }).ToListAsync();


                List<Category.CategoryModel> categories = await
                    _context.TicketCategory.Select(a => new Category.CategoryModel
                    {
                        Id = a.Id,
                        Name = a.Name,
                        SortOrder = a.SortOrder,
                        IsDefault = a.IsDefault
                    }).ToListAsync();


                List<Project.ProjectModel> projects = await
                    _context.TicketProject.Where(w => w.IsActive ==1).Select(a => new Project.ProjectModel
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        IsDefault = a.IsDefault
                    }).ToListAsync();


                return new TicketDetail
                {
                    Ticket = ticket,
                    Priorities = priorities,
                    Statuses = statuses,
                    Projects = projects,
                    Categories = categories
                };



            }
        }
    }
}
