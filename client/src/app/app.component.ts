import {Component, Optional, NgZone, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  isDarkTheme: boolean = false;
  constructor(
      private router: Router,
      private location: Location,
      private ngZone: NgZone) {
    }

      navItems = [
        {name: 'Home', desc:'Dashboard', icon:'home', route: ''},
        {name: 'Category', desc:'Ticket Category', icon:'dehaze', route: 'category'},
        {name: 'Status',desc:'Ticket Status',  icon:'poll', route: 'status'},
        {name: 'About', desc:'Contributors',icon:'people', route: 'about'},
      ];


    isActive(path) {
    return this.location.path() === path;
  }
}