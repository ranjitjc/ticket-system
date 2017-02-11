import { Component, OnInit, Optional, NgZone, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { NotificationService } from './shared/shared.module';
import { ServicesModule , AuthenticationService, ChatService  } from './services/services.module';
import { CurrentUser, Ticket, NotificationType} from './model/models'

declare var _: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  isDarkTheme: boolean = false;
  fullName: Subject<string>;
  notificationIcon:string;
  navItems = [
    { name: 'Material Demo', desc: 'Material Demo', icon: 'dashboard', route: 'material' },
    { name: 'About', desc: 'Contributors', icon: 'people', route: 'about' },
  ];

  isActive(path) {
    return this.location.path() === path;
  }
  
  constructor(
    private router: Router,
    private location: Location,
    private ngZone: NgZone,
    private _authService: AuthenticationService,
    private _notificationService: NotificationService,
    private _chatService:ChatService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.fullName = new Subject();

  }


  ngOnInit() {

    this.notificationIcon = "notifications_none";
    //this._authenticationService.login().subscribe();
    let subscription =
      this._authService.LoggedInUser.subscribe(
        (currentUser) => {
          //console.log('AppComponent:ctor.Next :' + JSON.stringify(currentUser) );
          if (!_.isEmpty(currentUser)) {
            this.fullName.next(currentUser.fullName);

            this.navItems = [
              { name: 'Home', desc: 'Dashboard', icon: 'home', route: '' },
              { name: 'Category', desc: 'Ticket Category', icon: 'dehaze', route: 'category' },
              { name: 'Status', desc: 'Ticket Status', icon: 'poll', route: 'status' },
              { name: 'ticket', desc: 'Tickets', icon: 'assignment', route: 'ticket' },
              { name: 'Material Demo', desc: 'Material Demo', icon: 'dashboard', route: 'material' },
              { name: 'About', desc: 'Contributors', icon: 'people', route: 'about' },
            ];
          }
          if (subscription) {
            //console.log('AppComponent:ngOnInit.unsubscribe.'),
            subscription.unsubscribe();
          }
        },
        (err) =>
          console.log('AppComponent:ctor.Error :' + err),
        () => {
          //console.log('AppComponent:ctor.Completed')
        }
      );


      // this._chatService.sendMessage.subscribe(
      //   data => {
      //     console.log("AppComponent:ngOnInit():_chatService.sendMessage : " + data);
      //     this.notificationIcon = "notifications_active";
      //   }
      // );

      this._notificationService.Notifications.subscribe(
        data=> {
            console.log("AppComponent:ngOnInit():_notificationService.Notifications : " + data);
            if (data.type == NotificationType.NOTIFY){
              this.notificationIcon = "notifications_active";
            }else{
              if (this.notificationIcon != "notifications_active"){
                this.notificationIcon = "notifications";
              }
            }
        }
      );


  }

  openNotification() {
    this.notificationIcon = "notifications_none";
    this._notificationService
      .show(this.viewContainerRef)
      .subscribe(res => {
        console.log('Dialog Result' + res)
        if (res) {
          this._notificationService.logs = [];
        }
      });

  }

}

