import { ConfirmationDialog  } from './confirmation.dialog';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import {OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ConfirmationService implements OnInit{

    constructor(private dialog: MdDialog) { 
    }

    ngOnInit() {
        
  }

    public confirm(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

        console.log('from ConfirmationService:');

        let dialogRef: MdDialogRef<ConfirmationDialog>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(ConfirmationDialog, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

}
