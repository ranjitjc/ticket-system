
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/persons")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = -1)]
    public class PersonsController : Controller
    {
        [HttpGet]
        public async Task<IEnumerable<Person>> GetPersons()
        {
            return new List<Person>
            {
                new Person{Name = "Max Musterman", City="Naustadt", Dob=new DateTime(1978, 07, 29)},
                new Person{Name = "Maria Musterfrau", City="London", Dob=new DateTime(1979, 08, 30)},
                new Person{Name = "John Doe", City="Los Angeles", Dob=new DateTime(1980, 09, 01)}
            };
        }
    }

    public class Person
    {
        public string Name { get; set; }
        public string City { get; set; }
        public DateTime Dob { get; set; }
    }
}