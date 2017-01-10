import { Component, OnInit } from '@angular/core';
import { StatusService, TicketStatus } from '../services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
    providers: [
        StatusService
    ]
})
export class StatusComponent extends OnInit {

    constructor(private _service: StatusService) {
        super();
    }

    ngOnInit() {
        this._service.loadData().then(data => {
            this.statuses = data;
        })
    }

    statuses: TicketStatus[] = [];
}