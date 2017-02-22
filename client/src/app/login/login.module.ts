import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule} from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService, TicketService } from '../services/services.module';

import { MessageModule } from '../shared/message/message.module'

import { SharedModule } from '../shared/shared.module'

import { LoginComponent } from './login.component'

@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    SharedModule,
    MessageModule,
  ],
  declarations: [
    LoginComponent,
  ],
  
  providers: [
    AuthenticationService,
  ]
})
export class LoginModule {}
