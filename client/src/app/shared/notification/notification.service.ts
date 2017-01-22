import { NotificationDialog, Notification } from './notification.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import {OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class NotificationService implements OnInit{

    private _notifications : BehaviorSubject<Notification>
    public Notifications: Observable<Notification>;
    public logs: Notification[] = [];

    constructor(private dialog: MdDialog) { 
        this._notifications = <BehaviorSubject<Notification>> new BehaviorSubject({});
        this.Notifications = this._notifications.asObservable();

        let notify : Notification = {
        action : "Initialized",
        component : "NotificationComponent",
        message : "Application is initialized!",
        time : new Date()
        }
        this.publish(notify );

        this.Notifications.subscribe(
            data=>{
                this.logs.push(data);
                console.log(this.logs);
            },
            err=>{
                console.error(err);
            }
        );
    }

    ngOnInit() {
        
  }

    public show(viewContainerRef: ViewContainerRef): Observable<boolean> {

        // console.log('from NotificationService:');
        // console.table(notification);
        // this._notifications.next(notification);

        let dialogRef: MdDialogRef<NotificationDialog>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;
        // config.position.right = "50px";
        // config.position.top = "50px";

        dialogRef = this.dialog.open(NotificationDialog, config);

        dialogRef.componentInstance.notifications = this.logs;
    
        return dialogRef.afterClosed();
    }

    publish(notification: Notification){
        console.log('from NotificationService:');
        console.log(notification);
        this._notifications.next(notification);
    }  
}

export interface Notification {
    component: string;
    action: string;
    message: string;
    time : Date;
}