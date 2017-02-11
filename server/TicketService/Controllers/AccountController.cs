using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using Microsoft.Extensions.Logging;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace TicketService.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IMediator _mediator;
        //private IPasswordHasher<QueryStack.GetAccount.UserModel> _hasher;
        private IConfigurationRoot _config;
        private ILogger<AccountController> _logger;
        public AccountController(IMediator mediator, 
            //IPasswordHasher<QueryStack.GetAccount.UserModel> hasher,
            IConfigurationRoot config,
            ILogger<AccountController> logger)
        {
            _mediator = mediator;
            // _hasher = hasher;
            _config = config;
             _logger = logger;
        }

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<QueryStack.GetAccount.UserModel> Authenticate()
        //{

        //    string logOnName = WindowsIdentity.GetCurrent().Name.Replace("OCD\\", "");
        //    QueryStack.GetAccount.Query query = new QueryStack.GetAccount.Query { loginName = logOnName };


        //    QueryStack.GetAccount.UserModel authUser = await _mediator.Send(query);

        //    return authUser;
        //}


        //[HttpGet("api/account/token")]
        //public async Task<IActionResult> CreateToken()
        //{
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate()
        {

            try
            {
                string logOnName = WindowsIdentity.GetCurrent().Name.Replace("OCD\\", "");
                QueryStack.GetAccount.Query query = new QueryStack.GetAccount.Query { loginName = logOnName };


                QueryStack.GetAccount.UserModel authUser = await _mediator.Send(query);

                //_hasher.VerifyHashedPassword(user, user.PasswordHash, model.Password)

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, authUser.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.GivenName, authUser.FullName),
                    new Claim(JwtRegisteredClaimNames.Email, authUser.UserName),
                    new Claim( "IsAdmin", authUser.IsAdmin ==1 ? "true": "false")

                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


                var token = new JwtSecurityToken(
                    issuer: _config["Tokens:Issuer"],
                    audience: _config["Tokens:Audience"],
                    claims:claims,
                    expires: DateTime.UtcNow.AddMinutes(15),
                    signingCredentials : credentials
                    );

                authUser.TokenType = "Jwt";
                authUser.AccessToken = new JwtSecurityTokenHandler().WriteToken(token);
                authUser.ExpiresIn = token.ValidTo;

                return Ok(authUser);

            }
            catch(Exception ex)
            {
                _logger.LogError($"Exception theown while creating JWT : {ex}");
            }

            return BadRequest("Failed to generage token");
        }

    }
}