import { Component, OnInit, NgModule } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';


import { AuthenticationService, TicketService } from '../services/services.module';

import { CurrentUser, Ticket, MessageModel, MessageType } from '../model/models'

import { TruncatePipe } from '../shared/shared.module'

declare var _: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private _authService: AuthenticationService,
    private _ticketService: TicketService) {
    this.LoggedInStateSub = new BehaviorSubject(0);
    //this.LoggedInStateSub.startWith(0);
    this.LoggedInErrorStateSub = new BehaviorSubject(0);
    //this.LoggedInErrorStateSub.startWith(0);

    this.LoggedInState = this.LoggedInStateSub.asObservable();
    this.LoggedInErrorState = this.LoggedInErrorStateSub.asObservable();
  }

  private currentUser: CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  errorMessage: any;
  isReportedTicketsLoading: boolean = true;
  isAssignedTicketsLoading: boolean = true;
  reportedTickets: any;
  isError:Boolean =false;
  assignedTickets: any;
  message:MessageModel;

  LoggedInStateSub: BehaviorSubject<Number>;
  LoggedInErrorStateSub: BehaviorSubject<Number>;

  LoggedInState: Observable<Number>;
  LoggedInErrorState: Observable<Number>;

  private reportedChartData: Array<any>;
  private assignedChartData:Array<any>;
  ngOnInit() {
    if (!_.isEmpty(this.currentUser)) {
      this.LoggedInStateSub.next(1);
      this.LoggedInErrorStateSub.next(0);
      this.loadData()
    } else {

      let subscription =
        this._authService.LoggedInUser.subscribe(
          (currentUser) => {
            this.isError = false;
            //console.log('HomeComponent:ngOnInit.Next :' + JSON.stringify(currentUser) );
            if (!_.isEmpty(currentUser)) {
              this.loadData()
              this.LoggedInStateSub.next(1);
              this.LoggedInErrorStateSub.next(0);

            } else {
              this.LoggedInStateSub.next(0);
              this.LoggedInErrorStateSub.next(1);
            }
            if (subscription) {
              //console.log('HomeComponent:ngOnInit.unsubscribe.'),
              subscription.unsubscribe();
            }
          },
          (err) => {
            console.log('HomeComponent:ngOnInit.Error :' + err)
            this.isError = true;
            this.message = {messageType : 3,
                        messageIcon:"error",
                        messageText : err};
          },
          () => {
            //console.log('HomeComponent:ngOnInit.Completed')
          }
        );
    }

    //testing messageCard
    this.message = {messageType : 3,
                        messageIcon:"error",
                        messageText : 'Tesing...'};

  }

  loadData(){
    this.getReportedTickets();
    this.getAssignedTickets();
    this.getReportedTicketsByStatus();
    this.getAssignedTicketsByStatus();
  }


  getReportedTickets() {

    this._ticketService.GetReportedTicketsByUser().subscribe(
      data => {
        this.reportedTickets = data;
        console.table(data);
        this.isReportedTicketsLoading = false;
      },
       (error:any) => {
            this.isError = true;
            this.message = {messageType : MessageType.ERROR,
                        messageIcon:"error",
                        messageText : <any>error};
          }
    )
  }

  getAssignedTickets() {

    this._ticketService.GetAssignedTicketsByUser().subscribe(
      data => {
        this.assignedTickets = data;
        console.table(data);
        this.isAssignedTicketsLoading = false;
      },
      (error: any) => {
         this.isError = true;
          this.message = {messageType : MessageType.ERROR,
                      messageIcon:"error",
                      messageText : <any>error};
      }
    )
  }

  getReportedTicketsByStatus(){
    this._ticketService.GetTicketsByStatus(52, 1).subscribe(
      data => {
        //this.assignedTickets = data;
        console.table(data);
        this.reportedChartData = data ;//data.map( a=>  { return  [a.statusName , a.count] });
        this.isAssignedTicketsLoading = false;
      },
      (error: any) => {
         this.isError = true;
          this.message = {messageType : MessageType.ERROR,
                      messageIcon:"error",
                      messageText : <any>error};
      }
    )
  }

  getAssignedTicketsByStatus(){
    this._ticketService.GetTicketsByStatus(52, 0).subscribe(
      data => {
        //this.assignedTickets = data;
        console.table(data);
        this.assignedChartData = data ;//data.map( a=>  { return  [a.statusName , a.count] });
        this.isAssignedTicketsLoading = false;
      },
      (error: any) => {
         this.isError = true;
          this.message = {messageType : MessageType.ERROR,
                      messageIcon:"error",
                      messageText : <any>error};
      }
    )
  }

}
