import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module'

import { AuthGuard} from './security/auth.guard';
import { AuthenticationService } from './services/auth.service';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MaterialComponent } from './material/material.component';
//import { LoginComponent } from './login/login.component';
import { StatusModule  } from './status/status.module';
import { CategoryComponent } from './category/category.component';
import { TicketComponent } from './ticket/ticket.component';
import { SearchComponent } from './search/search.component';

import {NotificationModule } from './shared/notification/notification.module';
import {ConfirmationModule } from './shared/confirmation/confirmation.module';


@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    AboutComponent, 
    MaterialComponent, 
    //LoginComponent, 
    //StatusComponent, 
    CategoryComponent, 
    TicketComponent, 
    SearchComponent, 
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    StatusModule,
    NotificationModule,
    ConfirmationModule
  ],
  providers: [AuthGuard, AuthenticationService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(
      private _authenticationService: AuthenticationService) {
        this._authenticationService.login().subscribe();
    }
 }
