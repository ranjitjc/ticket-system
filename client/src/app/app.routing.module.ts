import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard} from './security/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { MaterialComponent } from './material/material.component';
import { StatusComponent } from './status/status.component';
import { CategoryComponent } from './category/category.component';
import { TicketComponent } from './ticket/ticket.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'ticket', component: TicketComponent },
  { path: 'search', component: SearchComponent },
  { path: 'status', component: StatusComponent },
  { path: 'category', component: CategoryComponent },
//   { path: 'about/:id', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  //{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'material', component: MaterialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }