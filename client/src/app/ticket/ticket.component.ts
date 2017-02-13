import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { AuthenticationService, TicketService } from '../services/services.module';

import { CurrentUser, Ticket, MessageModel, MessageType } from '../model/models'

//third party contrils
//import { PolymerElement } from '@vaadin/angular2-polymer';

import { tableDatas } from './pagination-datas';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  isError: Boolean = false;
  tickets: Ticket[];
  page: number;
  pageSize: number;
  totalCount: number;
  loading: boolean = false;

  message: MessageModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthenticationService,
    private _ticketService: TicketService) { }
  ngOnInit() {
    this.getAllTickets();
    //this.page(this.offset, this.limit);
  }


  getAllTickets() {
    this.tickets = null;
    this._ticketService.GetAllTickets(this.offset+1).subscribe(
      data => {
        let response: any = data;
        this.tickets = <Ticket[]>response.data;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
        console.table(this.tickets);

        this.pagination = {
          currentPage: this.page,
          itemsPerPage: this.pageSize,
          totalItems: this.totalCount
        };
        //this.refreshMaterials();
        //this.isReportedTicketsLoading = false;


         this.count = this.pagination.totalItems;

        const start = this.offset * this.limit;
        const end = start + this.limit;

        let rows = [...this.rows];

        let t=0;
        for (let i = start; i < end; i++, t++) {
          rows[i] = this.tickets[t];
        }

        this.rows = rows;
        console.log('Page Results', start, end, rows);
        this.loading = false;

      },
      (error: any) => {
        this.message = {
          messageType: MessageType.ERROR,
          messageIcon: "error",
          messageText: <any>error
        };
        this.isError = true;
      }
    )


  }

 onPage(event) {
    console.log('Page Event', event);
    this.loading = true;
    this.offset = event.offset;
    this.limit = event.limit;
    this.getAllTickets();
  }


 onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    this.loading = true;
    
      let sort = event.sorts[0];
      // rows.sort((a, b) => {
      //   return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
      // });

      this.rows = [];
      this.count = 0;
 
    this.offset = 0;
    this.getAllTickets();
      
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
    console.log(' event.row.id : ' + event.row.id);

    this.router.navigate(['/ticket', event.row.id], { relativeTo: this.route });

  }


  // materials: Array<any> = tableDatas;
  parentRouter:any;
  pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 24
  };

  // availableLength: Array<number> = [5, 10, 20];

  // pagedTickets: Array<any> = [];

  // refreshMaterials() {
  //   if (this.tickets) {
  //     let start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage,
  //       end = start + this.pagination.itemsPerPage;
  //     this.pagedTickets = this.tickets; //.slice(start, end);

  //   }
  // }

  // detectChange(event) {
  //   if (event !== undefined && event.name === 'pagination_changed' && event.pagination !== undefined) {
  //     this.pagination = event.pagination;
  //     if (this.tickets) {
  //       this.getAllTickets();
  //     }
  //   }
  // }



  rows = [];
  selected = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 15;


}
