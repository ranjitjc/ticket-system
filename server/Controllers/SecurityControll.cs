using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace TicketSystem.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/security")]
    public class SecurityController : Controller
    {
        private readonly Data.TicketSystemContext _context;

        public SecurityController(Data.TicketSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<Models.AuthUser> Authenticate()
        {

            Models.AuthUser authUser = await Create(WindowsIdentity.GetCurrent());

            return  authUser ;
        }

        private async Task<Models.AuthUser> Create(WindowsIdentity currentWindowsUser)
        {
            var authUser = new Models.AuthUser();
            
            Console.WriteLine("currentWindowsUser.Name" + currentWindowsUser.Name);
            string name = currentWindowsUser.Name.Replace("OCD\\", ""); 
               
            // a much simplified case for example (better to retrieve by GUID)
            Models.User userInDatabase = await _context.Users.SingleOrDefaultAsync(a => a.UserName .ToLower() == name.ToLower() );

            if (userInDatabase != null)
            {
                authUser.UserName = userInDatabase.UserName;
                authUser.FullName = userInDatabase.FirstName + ' ' + userInDatabase.LastName;
                authUser.IsAdmin = userInDatabase.IsAdmin;
                authUser.AccessToken = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }
            
            return authUser;
        }

    }
}