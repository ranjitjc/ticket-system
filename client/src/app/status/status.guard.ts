import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import {StatusDetailComponent} from './detail/status.detail.component';


@Injectable()
export  class StatusGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) ) { // || id < 1) {
            //TODO: Convert to mdDialog
            alert('Invalid status Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/status']);
            // abort current navigation
            return false;
        };
        //TODO : Validate authorization
        return true;
    }
}


@Injectable()
export  class StatusEditGuard implements CanDeactivate<StatusDetailComponent> {

    canDeactivate(component: StatusDetailComponent): boolean {
        if (component.ticketStatusForm.dirty) {
            let name = component.ticketStatusForm.get('name').value || 'New Status';
            //TODO: Convert to mdDialog
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}