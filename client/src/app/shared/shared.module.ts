import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'
//component
//import { ConfirmationDialog }   from './confirmation/confirmation.dialog';
import { BarchartComponent } from './barchart/barchart.component'

//services
import { ConfirmationService } from './confirmation/confirmation.service';
import { NotificationService } from './notification/notification.service';

//modules
import { ConfirmationModule } from './confirmation/confirmation.module';
import { NotificationModule } from './notification/notification.module';

//pipes
//import { filterType } from './pipes/filterType';
import { ReversePipe } from './pipes/reverse';
import { TruncatePipe } from './pipes/truncate';


//widgets
import { MessageModule } from '../shared/message/message.module'

//validators
import { GenericValidator } from './validators/generic.validator'
import { NumberValidators } from './validators/number.validator';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    MessageModule,
    ConfirmationModule,
    NotificationModule
    //InMemoryWebApiModule.forRoot(ProductData),
  ],
    exports: [
        //ConfirmationDialog,

    ],
  declarations: [
    //ConfirmationDialog,
    
  ],
  
  providers: [
    //ConfirmationService,
  ],
    entryComponents: [
        //ConfirmationDialog,
    ],
})
export class SharedModule {}

export {
   GenericValidator,
        NumberValidators,
        ReversePipe,
        TruncatePipe,
        NotificationService,
       ConfirmationService,
       
}