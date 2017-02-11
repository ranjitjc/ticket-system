import { NgModule } from '@angular/core';
import { AuthenticationService } from './auth.service'
import { ChatService } from './chat.service'
import { StatusService } from './status.service'
import { TicketService } from './ticket.service'

@NgModule({})
export class ServicesModule{
    static forRoot(){
        return {
            ngModule : ServicesModule,
            providers: [
                AuthenticationService, 
                ChatService,
                StatusService,
                TicketService    
            ]
        }
    }
}

export {
    AuthenticationService,
    ChatService,
    StatusService,
    TicketService
}