import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

//services
import { StatusService } from '../services/status.service';

//guards
//import { StatusGuard , StatusEditGuard } from './status.guard'

//widgets
import { MessageModule } from '../shared/message/message.module'

//models
import { MessageType, TicketStatus } from '../model/models'

//components
import { CategoryComponent } from './category.component';
//import { CategoryDetailComponent } from './detail/category.detail.component';

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
      { path: 'category', component: CategoryComponent },
      //{ path: 'status/:id',
        //canActivate: [ StatusGuard],
        //canDeactivate: [ StatusEditGuard ],
        //component: CategoryDetailComponent
      //},
    ])
  ],
  declarations: [
    CategoryComponent,
    //CategoryDetailComponent,
    //MessageCard,
  ],
  
  providers: [
    //StatusService,
    //StatusGuard,
    //StatusEditGuard
  ]
})
export class CategoryModule {}

