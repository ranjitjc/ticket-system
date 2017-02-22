import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule} from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'

import { AuthenticationService, TicketService } from '../services/services.module';

import { MessageModule } from '../shared/message/message.module'

import { SharedModule } from '../shared/shared.module'

import { TruncatePipe } from '../shared/pipes/truncate'

import { HomeComponent } from './home.component'
import { BarchartComponent } from '../shared/barchart/barchart.component';
import { TicketComponent } from '../ticket/ticket.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    RouterModule.forChild([
      { path: 'ticket', component: TicketComponent },
    ]),
    SharedModule,
    MessageModule
  ],
  declarations: [
    HomeComponent,
    BarchartComponent,
    TruncatePipe,
  ],
  
  providers: [
    AuthenticationService,
    TicketService
  ]
})
export class HomeModule {}
