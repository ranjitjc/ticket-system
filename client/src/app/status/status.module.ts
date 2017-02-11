import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

//services
import { StatusService } from '../services/status.service';

//guards
import { StatusGuard , StatusEditGuard } from './status.guard'

//widgets
import { MessageModule } from '../shared/message/message.module'

//models
import { MessageType, TicketStatus } from '../model/models'

//components
import { StatusComponent } from './status.component';
import { StatusDetailComponent } from './detail/status.detail.component';

import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    MessageModule,
    //InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'status', component: StatusComponent },
      { path: 'status/:id',
        canActivate: [ StatusGuard],
        canDeactivate: [ StatusEditGuard ],
        component: StatusDetailComponent
      },
    ])
  ],
  declarations: [
    StatusComponent,
    StatusDetailComponent,
    //ProductEditComponent,
    //ProductFilterPipe
    //MessageCard,
  ],
  
  providers: [
    StatusService,
    StatusGuard,
    StatusEditGuard
  ]
})
export class StatusModule {}

