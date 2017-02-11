//import { NotificationService } from './notification.service';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReversePipe } from '../pipes/reverse'
//import {FilterTypePipe } from '../pipes/filterType'
import { MessageCard}   from './message-card';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
    ],
    exports: [
        MessageCard,
    ],
    declarations: [
        MessageCard,
    ],
    entryComponents: [
        MessageCard,
    ],
})
export class MessageModule { }