import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'

// import { AuthenticationService } from './services/auth.service';
// import { ChatService  } from './services/chat.service';
// import { TicketService  } from './services/ticket.service';

import { ServicesModule , AuthenticationService, ChatService  } from './services/services.module';

import { AuthGuard} from './security/auth.guard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module'

import { HomeModule } from './home/home.module';
import { AboutComponent } from './about/about.component';
import { MaterialComponent } from './material/material.component';
import { LoginModule } from './login/login.module';
import { StatusModule  } from './status/status.module';
import { CategoryModule } from './category/category.module';
import { TicketModule } from './ticket/ticket.module';
import { SearchComponent } from './search/search.component';

//import {NotificationModule } from './shared/notification/notification.module';
//import {ConfirmationModule } from './shared/confirmation/confirmation.module';
//import { MessageModule } from './shared/message/message.module'


import { BarchartComponent } from './shared/barchart/barchart.component';

@NgModule({
  declarations: [
    AppComponent, 
    //HomeComponent, 
    AboutComponent, 
    MaterialComponent, 
    //LoginComponent, 
    //CategoryComponent,  
    SearchComponent, 
    //BarchartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    ServicesModule.forRoot(),
    AppRoutingModule,
    //MessageModule,
    LoginModule,
    HomeModule,
    StatusModule,
    CategoryModule,
    TicketModule,
    //NotificationModule,
    //ConfirmationModule
  ],
  providers: [
    AuthGuard, 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
      private _authenticationService: AuthenticationService,
      private _chatService: ChatService) {
        this._authenticationService.logout();
        //this._authenticationService.login().subscribe();
        
        
        this._chatService.start(true).subscribe(
            null,
            error => console.log('AppModule:init:_chatService:Start(): ' + error));
    }
 }
