import { MdDialogRef } from '@angular/material';
import { Component, Pipe} from '@angular/core';
import { Observable } from 'rxjs/Rx';

declare var _:any;

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationDialog {

    public title: string;
    public message: string;
    public notifications : Notification[] =[];

    constructor(public dialogRef: MdDialogRef<NotificationDialog>) {
        this.title="Notifications"
    }

    delete(time){
        console.log('Delete Notification ' + time);
        //this.notifications = _.without(this.notifications, time);
        this.notifications =_.filter(this.notifications, (o) => o.time != time)
    }
}

export interface Notification {
    component: string;
    action: string;
    message: string;
    time : Date;
}


    // template: `
    //     <p>{{ title }}</p>
    //     <p>{{ message }}</p>
    //     <button type="button" md-raised-button 
    //         (click)="dialogRef.close(true)">OK</button>
    //     <button type="button" md-button 
    //         (click)="dialogRef.close()">Cancel</button>
    // `,