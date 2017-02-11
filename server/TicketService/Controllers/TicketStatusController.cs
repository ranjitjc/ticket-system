using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TicketService.QueryStack.TicketStatus;
using TicketService.RealTime;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Microsoft.AspNetCore.Authorization;

namespace TicketService.Controllers
{
    [Authorize(Policy = "AdminPolicy")]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class TicketStatusController : ApiHubController<ChatHub>
    {

        private readonly IMediator _mediator;
        private ILogger<TicketStatusController> _logger;
        private IConnectionManager _signalRConnectionManager;
        public TicketStatusController(IConnectionManager signalRConnectionManager, IMediator mediator, ILogger<TicketStatusController> logger) : base(signalRConnectionManager)
        {
            _signalRConnectionManager = signalRConnectionManager;
            _mediator = mediator;
            _logger = logger;
        }

        //[Authorize(Policy = "AdminPolicyError")]
        public async Task<IActionResult> Get(GetTicketStatusList.Query query)
        {
            try
            {
                var model = await _mediator.Send(query);
                //Clients.All.newMessage( new RealTimeMessage {
                //    Action="PUSH NOTIFICATION",
                //    Type = MessageType.NOTIFY,
                //    Component = "TicketStatusController",
                //    Message = "SignalR:Sending Status List!!!"
                //});
                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting TicketStatus: {ex}");

                return StatusCode(500);
            }


        }

        [HttpGet("{id}", Name = "GetTicketStatus")]
        public async Task<IActionResult> GetTicketStatus(GetTicketStatus.Query query)
        {
            _logger.LogInformation("GetTicketStatus.id::" + query.Id);
            try
            {
                var model = await _mediator.Send(query);
                if (model == null)
                    NotFound($"TicketStatus {query.Id} was not found");

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting TicketStatus: {ex}");
                return StatusCode(500);
            }
        }

        //[Authorize(Policy = "AdminPolicyError")]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] CommandStack.TicketStatus.Create.Command model)
        {
            if (!ModelState.IsValid)
            {
                BadRequest();
            }
            _logger.LogInformation("StatusController:Create => " + model.Name);

            try
            {
                int id = await _mediator.Send(model);
                _signalRConnectionManager.GetHubContext<ChatHub>().Clients.All.newMessage(
                    new RealTimeMessage
                    {
                        Action = "PUSH NOTIFICATION",
                        Type = MessageType.NOTIFY,
                        Component = "TicketStatusController",
                        Message = "SignalR:New Ticket Status is created!!!"
                    });

                return Ok(id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting TicketStatus: {ex}");
                return StatusCode(500);
            }
        }

        [HttpPut(Name = "UpdateTicketStatus")]
        //[ValidateAntiForgeryToken]
        public async Task Update([FromBody] CommandStack.TicketStatus.Update.Command model)
        {
            if (!ModelState.IsValid)
            {
                BadRequest();
            }
            _logger.LogInformation("StatusController:Update => " + model.Id);
            try
            {
                await _mediator.Send(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting TicketStatus: {ex}");
                StatusCode(500);
            }
        }

        [HttpDelete("{id}", Name = "DeleteTicketStatus")]
        //[ValidateAntiForgeryToken]
        public async Task Delete(CommandStack.TicketStatus.Delete.Command model)
        {
            _logger.LogInformation("StatusController:Delete => " + model.Id);
            try
            {
                await _mediator.Send(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Get():Threw exception while getting TicketStatus: {ex}");
                StatusCode(500);
            }
        }

    }
}