using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketService.QueryStack.Ticket;

namespace TicketService.Controllers
{
    //[Authorize(Policy = "AdminPolicy")]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class TicketController: Controller
    {

        private readonly IMediator _mediator;
        private ILogger<TicketController> _logger;
        private IConnectionManager _signalRConnectionManager;
        public TicketController(IConnectionManager signalRConnectionManager, IMediator mediator, ILogger<TicketController> logger) //: base(signalRConnectionManager)
        {
            _signalRConnectionManager = signalRConnectionManager;
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("AssignedTickets")]
        public async Task<IActionResult> GetTicketStatus(GetAssignedTickets.Query query)
        {

            //GetAssignedTicketList.Query query = new GetAssignedTicketList.Query { AssignedUser = AssignedUser };
            _logger.LogInformation("GetAssignedTicketList.AssignedUser::" + query.AssignedUser);
            try
            {
                var model = await _mediator.Send(query);
                if (model == null)
                    NotFound();

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting GetAssignedTicketList: {ex}");
                return StatusCode(500);
            }
        }


        [HttpGet("ReportedTickets")]
        public async Task<IActionResult> GetTicketStatus(QueryStack.Ticket.GetReportedTickets.Query query)
        {

            //GetAssignedTicketList.Query query = new GetAssignedTicketList.Query { AssignedUser = AssignedUser };
            _logger.LogInformation("GetAssignedTicketList.AssignedUser::" + query.ReportedUser);
            try
            {
                var model = await _mediator.Send(query);
                if (model == null)
                    NotFound();

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting GetAssignedTicketList: {ex}");
                return StatusCode(500);
            }
        }


        public async Task<IActionResult> Get(GetAllTickets.Query query)
        {
            try
            {
                var model = await _mediator.Send(query);
                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting Tickets: {ex}");

                return StatusCode(500);
            }


        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(GetTicket.Query query)
        {
            _logger.LogInformation("GetTicket.id::" + query.Id);
            try
            {
                var model = await _mediator.Send(query);
                if (model == null)
                    NotFound($"Ticket {query.Id} was not found");

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting Ticket: {ex}");
                return StatusCode(500);
            }
        }


        [HttpGet("ReportedTicketsByStatus")]
        public async Task<IActionResult> Get(GetTicketsByStatus.Query query)
        {
            try
            {
                var model = await _mediator.Send(query);
                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting Tickets: {ex}");

                return StatusCode(500);
            }


        }
    }
}
