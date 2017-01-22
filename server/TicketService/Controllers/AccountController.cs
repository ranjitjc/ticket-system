using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using Microsoft.Extensions.Logging;
using MediatR;

namespace TicketService.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IMediator _mediator;
        private ILogger<AccountController> _logger;
        public AccountController(IMediator mediator, ILogger<AccountController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<QueryStack.GetAccount.UserModel> Authenticate()
        {

            string logOnName = WindowsIdentity.GetCurrent().Name.Replace("OCD\\", "");
            QueryStack.GetAccount.Query query = new QueryStack.GetAccount.Query { loginName = logOnName };


            QueryStack.GetAccount.UserModel authUser = await _mediator.Send(query);

            return authUser;
        }

    }
}