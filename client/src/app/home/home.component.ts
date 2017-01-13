import { Component, OnInit } from '@angular/core';
import { CurrentUser, AuthenticationService } from '../services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

declare var _:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers : []
  
})
export class HomeComponent implements OnInit {

  constructor(private _authService: AuthenticationService) { 
    this.LoggedInStateSub =new BehaviorSubject(0);
    //this.LoggedInStateSub.startWith(0);
    this.LoggedInErrorStateSub =new BehaviorSubject(0);
    //this.LoggedInErrorStateSub.startWith(0);

    this.LoggedInState = this.LoggedInStateSub.asObservable();
    this.LoggedInErrorState = this.LoggedInErrorStateSub.asObservable();
  }

  private currentUser : CurrentUser = JSON.parse( localStorage.getItem('currentUser'));


  myTickets: any[] = [
    {
      Id : 1,
      assignedTo: 'Qi',
      subject: 'priority for 36000879',
      message: 'Please bump up the priority on 36000879',
      status: 'Work In Progress'
    },
    {
      Id : 19879,
      assignedTo: 'Qi',
      subject: 'launching new site.',
      message: 'Load data for France sites',
      status: 'Open'
    },
    {
      Id : 3,
      assignedTo: 'Tharun',
      subject: 'network drop out.',
      message: 'Axeda network drop out or go to sleeping mode',
      status: 'Waiting For User'
    }
  ];


  assignedTickets: any[] = [
    {
      Id : 18787,
      from: 'Roman',
      subject: 'Ortho Plus Admin Access',
      message: 'Please give access to patriena.fu-sum@orthoclinicaldiagnostics.com ',
      status: 'Work In Progress'
    },
    {
      Id : 5,
      from: 'Hal',
      subject: 'Credit Alert Notification ',
      message: 'Need the Subject updated on the Credit Hold Alert.',
      status: 'Open'
    },
    {
      Id : 18952,
      from: 'Bob',
      subject: 'Error logging in to SightMax',
      message: 'Users are unable to log into to Sightmax.',
      status: 'Open'
    }
  ];

  LoggedInStateSub : BehaviorSubject<Number>;
  LoggedInErrorStateSub : BehaviorSubject<Number>;

  LoggedInState : Observable<Number>;
  LoggedInErrorState : Observable<Number>;

  ngOnInit() {
    if (!_.isEmpty(this.currentUser)){
        this.LoggedInStateSub.next(1);
        this.LoggedInErrorStateSub.next(0);
    }else{
      this._authService.LoggedInUser.subscribe( 
        (currentUser) => {
          console.log('HomeComponent:ngOnInit.Next :' + JSON.stringify(currentUser) );
          if (!_.isEmpty(currentUser)) {

            this.LoggedInStateSub.next(1);
            this.LoggedInErrorStateSub.next(0);
              
          }else{
              this.LoggedInStateSub.next(0);
              this.LoggedInErrorStateSub.next(1);
          }
          //TODO: Unsubscribe
          //this._authService.LoggedInUser.
        },
        (err) => 
          console.log('HomeComponent:ngOnInit.Error :' + err),
        () => 
          console.log('HomeComponent:ngOnInit.Completed') 
      );
    }
  }

}
