using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.RealTime
{
    

    public class Broadcaster : Hub<IBroadcaster>
    {
        public override Task OnConnected()
        {
            // Set connection id for just connected client only
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        // Server side methods called from client
        public Task Subscribe(int matchId)
        {
            return Groups.Add(Context.ConnectionId, matchId.ToString());
        }

        public Task Unsubscribe(int matchId)
        {
            return Groups.Remove(Context.ConnectionId, matchId.ToString());
        }
    }

    public interface IBroadcaster
    {
        Task SetConnectionId(string connectionId);
        Task UpdateStatus(QueryStack.TicketStatus.TicketStatusModel match);
        Task AddFeed(QueryStack.TicketStatus.TicketStatusModel feed);
        //Task AddChatMessage(ChatMessage message);
    }
}
