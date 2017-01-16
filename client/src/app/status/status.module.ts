import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { StatusComponent } from './status.component';
import { StatusDetailComponent } from './detail/status.detail.component';

import { StatusService, TicketStatus } from '../services/status.service';

@NgModule({
  imports: [
    //SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    //InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'status', component: StatusComponent },
      { path: 'status/:id',
        //canActivate: [ ProductDetailGuard],
        component: StatusDetailComponent
      },
    //   { path: 'productEdit/:id',
    //     canDeactivate: [ ProductEditGuard ],
    //     component: ProductEditComponent 
    //   },
    ])
  ],
  declarations: [
    StatusComponent,
    StatusDetailComponent,
    //ProductEditComponent,
    //ProductFilterPipe
  ],
  providers: [
    StatusService,
    //ProductDetailGuard,
    //ProductEditGuard
  ]
})
export class StatusModule {}
