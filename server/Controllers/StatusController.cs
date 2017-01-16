using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace TicketSystem.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/ticketStatus")]
    public class StatusController : Controller
    {
        private readonly Data.TicketSystemContext _context;

        public StatusController(Data.TicketSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Models.TicketStatus>> Statuses()
        {
            return await _context.TicketStatuses.ToListAsync();
        }

        [HttpGet("{id}", Name = "GetTicketStatus")]
        public async Task<Models.TicketStatus> GetTicketStatus(int id)
        {
            Console.WriteLine("GetTicketStatus.id::" + id);
           Models.TicketStatus status = await _context.TicketStatuses.FirstOrDefaultAsync( w=> w.Id == id );

           
            if (status == null) 
                NotFound();
        
            Console.WriteLine("GetTicketStatus :" + status);

            return status;
        }

        // [HttpPost]
        // public IActionResult Create([FromBody] TodoItem item)
        // {
        //     if (item == null)
        //     {
        //         return BadRequest();
        //     }
        //     TodoItems.Add(item);
        //     return CreatedAtRoute("GetTodo", new { id = item.Key }, item);
        // }

        // [HttpPut("{id}")]
        // public IActionResult Update(string id, [FromBody] TodoItem item)
        // {
        //     if (item == null || item.Key != id)
        //     {
        //         return BadRequest();
        //     }

        //     var todo = TodoItems.Find(id);
        //     if (todo == null)
        //     {
        //         return NotFound();
        //     }

        //     TodoItems.Update(item);
        //     return new NoContentResult();
        // }


        // [HttpDelete("{id}")]
        // public IActionResult Delete(string id)
        // {
        //     var todo = TodoItems.Find(id);
        //     if (todo == null)
        //     {
        //         return NotFound();
        //     }

        //     TodoItems.Remove(id);
        //     return new NoContentResult();
        // }

    }
}