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
            // Add service and create Policy with options
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials() );
            });
            // Add framework services.
            services.AddMvc();
                //.AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.AddSignalR(options => options.Hubs.EnableDetailedErrors = true);

            services.AddSwaggerGen();

            services.AddAutoMapper();

            Mapper.AssertConfigurationIsValid();

            services.AddMediatR();
            var optionsBuilder = new DbContextOptionsBuilder<Repository.TicketServiceContext>();
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("TicketsConnection"));


            // Add application services.
            //services.AddTransient<IDatabaseService, TicketServiceContext>();

            services.AddScoped<IDatabaseService>(_ => new TicketService.Repository.TicketServiceContext( optionsBuilder.Options));
            

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddProvider(new MyLoggerProvider());
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // global policy - assign here or on each controller
            app.UseCors("CorsPolicy");


            app.UseMvc();
            app.UseSignalR();

            app.UseSwagger();
            app.UseSwaggerUi();
        }
    }
}
