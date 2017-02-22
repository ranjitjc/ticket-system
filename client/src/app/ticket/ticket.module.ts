import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AuthGuard} from '../security/auth.guard';

import { TicketService } from '../services/services.module';

//import { StatusGuard , StatusEditGuard } from './status.guard'

import { MessageCard } from '../shared/message/message-card'

import { MessageType, TicketStatus } from '../model/models'

import { TicketComponent } from './ticket.component';
import { TicketDetailComponent } from './detail/ticket.detail.component';


// import { MdPaginationModule } from '../ng2-material/pagination'

// import { MdDataTableModule } from '../ng2-material/data-table'

@NgModule({
  imports: [
    //SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    //MdDataTableModule,
    //MdPaginationModule,
    //InMemoryWebApiModule.forRoot(ProductData),
    NgxDatatableModule,
    RouterModule.forChild([
      { path: 'ticket', component: TicketComponent, canActivate: [AuthGuard] },
      { path: 'ticket/:id',
        //canActivate: [ StatusGuard],
        //canDeactivate: [ StatusEditGuard ],
        component: TicketDetailComponent, canActivate: [AuthGuard]
      },
    ])
  ],
  declarations: [
    TicketComponent,
    TicketDetailComponent,
    //MessageCard,
    //PolymerElement('vaadin-combo-box'),
    //PolymerElement('paper-input')
  ],
  //entryComponents : [TicketComponent],
  //bootstrap : [TicketComponent],
  providers: [
    TicketService,
    //StatusGuard,
    //StatusEditGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketModule {}