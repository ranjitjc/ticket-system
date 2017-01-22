import { ConfirmationService } from './confirmation.service';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationDialog }   from './confirmation.dialog';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
    ],
    exports: [
        ConfirmationDialog,
    ],
    declarations: [
        ConfirmationDialog,
    ],
    providers: [
        ConfirmationService,
    ],
    entryComponents: [
        ConfirmationDialog,
    ],
})
export class ConfirmationModule { }
