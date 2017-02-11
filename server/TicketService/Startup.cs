using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using TicketService.Repository;
using Newtonsoft.Json;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace TicketService
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddSingleton(Configuration);
            //var settings = new JsonSerializerSettings();
            //settings.ContractResolver = new Infrastructure.SignalRContractResolver();
            //var serializer = JsonSerializer.Create(settings);
            //services.AddSingleton(_ => serializer);

            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new Infrastructure.SignalRContractResolver();

            var serializer = JsonSerializer.Create(settings);
            services.Add(new ServiceDescriptor(typeof(JsonSerializer),
                         provider => serializer,
                         ServiceLifetime.Transient));


            // Add service and create Policy with options
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    );
            });

            services.AddAuthorization(cfg => {
                cfg.AddPolicy("AdminPolicy", p => p.RequireClaim("IsAdmin", "true"));
                cfg.AddPolicy("AdminPolicyError", p => p.RequireClaim("IsAdmin", "true1"));
                
            });

            // Add framework services.
            services.AddMvc();
                //.AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.AddSignalR(
                options => {
                    options.Hubs.EnableDetailedErrors = true;
                    options.EnableJSONP = true;
                });

            //services.AddTask<FeedEngine>();

            services.AddSwaggerGen();

            services.AddAutoMapper();

            //Mapper.AssertConfigurationIsValid();

            Mapper.Initialize(cfg =>
            {
                //cfg.CreateMap<Domain.TicketStatus, TicketService.QueryStack.TicketStatus.TicketStatusModel>();
                cfg.CreateMap<Domain.Ticket, TicketService.QueryStack.Ticket.TicketModel>();
                cfg.CreateMap<Domain.TicketStatus, TicketService.QueryStack.Ticket.TicketModel>();
                cfg.CreateMap<Domain.TicketPriority, TicketService.QueryStack.Ticket.TicketModel>();
                cfg.CreateMap<Domain.TicketProject, TicketService.QueryStack.Ticket.TicketModel>();
                cfg.CreateMap<Domain.TicketOrganization, TicketService.QueryStack.Ticket.TicketModel>();
                cfg.CreateMap<Domain.TicketCategory, TicketService.QueryStack.Ticket.TicketModel>();
                cfg.CreateMap<Domain.TicketPost, TicketService.QueryStack.Ticket.PostModel>()
                    .ForMember( dest => dest.UserName , opt => opt.MapFrom( src => src.PostedUser.UserName) );
                cfg.CreateMap<Domain.User, TicketService.QueryStack.Ticket.TicketModel>();
                cfg.CreateMap<Domain.User, TicketService.QueryStack.Ticket.PostModel>();
                
                //cfg.CreateMap<TicketService.QueryStack.Ticket.PostModel, Domain.User>();

            });

            services.AddMediatR();

            if (Configuration["Data:Database"].ToUpper().Equals("SQLSERVER"))
            {
                var optionsBuilder = new DbContextOptionsBuilder<Repository.SqlServer.TicketServiceContext>();
                optionsBuilder.UseSqlServer(Configuration.GetConnectionString("SqlConnection"));

                // Add application services.
                services.AddScoped<IDatabaseService>(_ => new Repository.SqlServer.TicketServiceContext(optionsBuilder.Options));
            }else if (Configuration["Data:Database"].ToUpper().Equals("MONGODB"))
            {
                //TODO: To be implemented
            }

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddProvider(new MyLoggerProvider());
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // global policy - assign here or on each controller
            app.UseCors("CorsPolicy").UseStaticFiles().UseWebSockets();

            //
            app.UseJwtBearerAuthentication(new JwtBearerOptions() {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"])),
                    ValidateLifetime = true

                }
            });

            app.UseMvc();
            //(routes =>
            //    {
            //        // Matches requests that correspond to an existent controller/action pair
            //        routes.MapRoute(
            //            name: "default",
            //            template: "{controller=Home}/{action=Index}/{id?}");
            //    }
            //);
            app.UseWebSockets();
            app.UseSignalR();

            app.UseSwagger();
            app.UseSwaggerUi();
        }
    }
}
