import { Component, OnInit } from '@angular/core';
import { StatusService, TicketStatus } from '../services/status.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

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
    ErrorMessage:string;
    statuses: TicketStatus[] = [];

    constructor(private _service: StatusService) {
        super();
        this.isLoading= true;
        this.isError = false;
        
    }

    ngOnInit() {
        this._service.GetAll().subscribe(
            data => {
            this.statuses = data;
            this.isLoading= false;
            },
            err => {
                console.error("StatusComponent.ngOnit :" + err);
                this.ErrorMessage = err;
                this.isLoading = false;
                this.isError = true;
            }
        );
    }

    
}