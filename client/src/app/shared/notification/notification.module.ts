import { NotificationService } from './notification.service';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReversePipe } from '../pipes/reverse'
import { NotificationDialog }   from './notification.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
    ],
    exports: [
        NotificationDialog,
    ],
    declarations: [
        NotificationDialog,
        ReversePipe
    ],
    providers: [
        NotificationService,
    ],
    entryComponents: [
        NotificationDialog,
    ],
})
export class NotificationModule { }
