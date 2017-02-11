import { Component, OnInit } from '@angular/core';
import { StatusService } from '../services/status.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

//notifications
import {NotificationService} from '../shared/notification/notification.service';

//models
import { MessageModel, MessageType , TicketStatus, Notification, NotificationType} from '../model/models'


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
    providers: [
        StatusService,
    ]
})
export class StatusComponent extends OnInit {
    isLoading:Boolean;
    isError:Boolean;
    //ErrorMessage:string;
    message:MessageModel;
    statuses: TicketStatus[] = [];
    totalCount : Number;

    constructor(private _service: StatusService, private _notification: NotificationService) {
        super();
        this.isLoading= true;
        this.isError = false;
        
    }

    ngOnInit() {
        this._service.GetAll().subscribe(
            data => {
            this.statuses = data;
            this.totalCount = data.length;
            this.isLoading= false;
            },
            error => {
                console.error("StatusComponent.ngOnit :" + error);
                this.message = {messageType : MessageType.ERROR,
                        messageIcon:"error",
                        messageText : <any>error};
                //this.ErrorMessage = error;
                this.isLoading = false;
                this.isError = true;
            }
        );
    }

    
}