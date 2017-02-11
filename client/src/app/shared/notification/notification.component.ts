import { MdDialogRef } from '@angular/material';
import { Component, Pipe} from '@angular/core';
import { Observable , Subject} from 'rxjs/Rx';

declare var _:any;

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationDialog {

    public title: string;
    public message: string;
    public notifications : Notification[];

    constructor(public dialogRef: MdDialogRef<NotificationDialog>) {
        this.title="Notifications"
    }

    delete(time){
        console.log('Delete Notification ' + time);
        // //this.notifications = _.without(this.notifications, time);
        // this.notifications =_.filter(this.notifications, (o) => o.time != time)
    }
}

export enum NotificationType { NOTIFY = 1, LOG = 2 }

export interface Notification {
    type: NotificationType;
    component: string;
    action: string;
    message: string;
    time: Date;
}



// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'filterType'
})
export class FilterTypePipe {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, args?) {
    // ES6 array destructuring
    let type : NotificationType = args;
    return value.filter(value=> value.type == type)
  }

}