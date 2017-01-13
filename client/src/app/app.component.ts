import {Component, OnInit, Optional, NgZone, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { CurrentUser, AuthenticationService } from './services/auth.service';

declare var _:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  //providers: [AuthenticationService]
})
export class AppComponent implements OnInit{
  isDarkTheme: boolean = false;
  fullName : Subject<string>;
  navItems = [
      {name: 'Material Demo', desc:'Material Demo',icon:'dashboard', route: 'material'},
      {name: 'About', desc:'Contributors',icon:'people', route: 'about'},
    ];

  isActive(path) {
    return this.location.path() === path;
  }



  constructor(
      private router: Router,
      private location: Location,
      private ngZone: NgZone,
      private _authService: AuthenticationService
     ) {
       //this.fullName = <BehaviorSubject<string>> new BehaviorSubject('');
       this.fullName =new Subject();
    }

     


    

  ngOnInit(){
    //this._authenticationService.login().subscribe();
    let subscription = 
      this._authService.LoggedInUser.subscribe( 
        (currentUser) => {
          console.log('AppComponent:ctor.Next :' + JSON.stringify(currentUser) );
        if (!_.isEmpty(currentUser)) {

          this.fullName.next(currentUser.fullName);
          
            this.navItems = [
              {name: 'Home', desc:'Dashboard', icon:'home', route: ''},
              {name: 'Category', desc:'Ticket Category', icon:'dehaze', route: 'category'},
              {name: 'Status',desc:'Ticket Status',  icon:'poll', route: 'status'},
              {name: 'Material Demo', desc:'Material Demo',icon:'dashboard', route: 'material'},
              {name: 'About', desc:'Contributors',icon:'people', route: 'about'},
            ];
        }
        if (subscription) {
          console.log('AppComponent:ngOnInit.unsubscribe.'),
          subscription.unsubscribe();
        }
        },
        (err) => 
          console.log('AppComponent:ctor.Error :' + err),
        () => 
          console.log('AppComponent:ctor.Completed') 
      );
  }
}