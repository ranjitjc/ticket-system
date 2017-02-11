using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketService.RealTime
{
    

    //public class Broadcaster : Hub<IBroadcaster>
    //{
    //    public override Task OnConnected()
    //    {
    //        // Set connection id for just connected client only
    //        return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
    //    }

    //    // Server side methods called from client
    //    public Task Subscribe(int matchId)
    //    {
    //        return Groups.Add(Context.ConnectionId, matchId.ToString());
    //    }

    //    public Task Unsubscribe(int matchId)
    //    {
    //        return Groups.Remove(Context.ConnectionId, matchId.ToString());
    //    }
    //}

    //public interface IBroadcaster
    //{
    //    Task SetConnectionId(string connectionId);
    //    Task UpdateStatus(QueryStack.TicketStatus.TicketStatusModel match);
    //    Task AddFeed(QueryStack.TicketStatus.TicketStatusModel feed);
    //    //Task AddChatMessage(ChatMessage message);
    //}


    [HubName("chat")]
    public class ChatHub : Hub<IChat>
    {

        public override Task OnConnected()
        {
            // Set connection id for just connected client only
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        //public void SendMessage(string message)
        //{
        //    Clients.All.newMessage(message);
        //}

    }

    public interface IChat
    {
        Task SetConnectionId(string connectionId);

        //Task SendMessage(string message);

        Task SendMessage(RealTimeMessage message);

    }


    public enum MessageType { NOTIFY = 1, LOG = 2 }


    public class RealTimeMessage
    {
        public string Action { get; set; }
        public MessageType Type { get; set; }
        public string Component { get; set; }
        public string Message { get; set; }
        public DateTime Time { get; set; }

        public RealTimeMessage()
        {
            this.Time = DateTime.Now;
        }
    }

}
