import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import { ConfirmationService } from '../../shared/confirmation/confirmation.service'

import { StatusService, TicketStatus } from '../../services/status.service';

import {NotificationService, Notification} from '../../shared/notification/notification.service';


import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Subscription }       from 'rxjs/Subscription';

import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from '../../shared/generic.validator';


@Component({
  selector: 'app-status-detail',
  templateUrl: './status.detail.component.html',
  styleUrls: ['./status.detail.component.scss']
})
export class StatusDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  isLoading:Boolean;
  isSaving:Boolean;
  ticketStatus: TicketStatus;
  private sub: Subscription;
  ticketStatusForm: FormGroup;
  SortOrders : number[];
  errorMessage:any;
  pageTitle:string;
  totalCount : number;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  //snackBar variables
  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MdSnackBar,
              public confirmService: ConfirmationService,
              private viewContainerRef: ViewContainerRef,
              private _service: StatusService, 
              private _notification: NotificationService) { 
    this.isLoading= true;

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
        name: {
            required: 'Status is required.',
            minlength: 'Status must be at least three characters.',
            maxlength: 'Status cannot exceed 50 characters.'
        },
        sortOrder: {
            range: 'Rate the product between 1 (lowest) and 5 (highest).'
        }
    };

    // Define an instance of the validator for use with this form, 
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

    this.SortOrders = [];
    

  }

    ngOnInit() {
       this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                console.log('id :' + id);
                this.getTicketStatus(id);
        });

        this.sub = this.route.queryParams.subscribe(
            params => {
                this.totalCount = params['count'] ;
                this.totalCount++;
                for (var _i = 1; _i <= this.totalCount ; _i++) {
                    this.SortOrders.push(_i);
                }
                console.log('id :' + this.totalCount);
        });


        this.ticketStatusForm = this.fb.group({
          name :  ['', [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)]
                  ],
          //sortOrder: ['', NumberValidators.range(1, 5)],
          sortOrder: '',
          isDefault : 0
        });
        
        
    }

  ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.ticketStatusForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.ticketStatusForm);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    notify(action, message){
      let notify : Notification = {
        action : action,
        component : "StatusDetailComponent",
        message : message,
        time : new Date()
      }
      console.log('from StatusDetailComponent:' + action + " : " + message);
      this._notification.publish(notify);

    }

  
  getTicketStatus(id:Number){

    if (id >0){
    this._service.GetById(id).subscribe(
        data => {
            this.onTicketStatusRetrieved(data);
            this.isLoading= false;
            console.table(data);
        },
        (error:any) => this.errorMessage = <any>error
    )
    }else{
      //New
      var ticketStatus = {id:0, name:'', sortOrder:this.totalCount, isDefault:0};
      this.onTicketStatusRetrieved( ticketStatus);
            this.isLoading= false;
    }
  }

  onTicketStatusRetrieved(ticketStatus: TicketStatus): void {
    if(this.ticketStatusForm){
      this.ticketStatusForm.reset();
    }
    this.ticketStatus = ticketStatus;

    if (this.ticketStatus.id === 0) {
        this.pageTitle = 'Add New Ticket Status';
    } else {
        this.pageTitle = `Edit Ticket Status : ${this.ticketStatus.name}`;
    
    
      this.ticketStatusForm.patchValue({
        name : ticketStatus.name,
        sortOrder: ticketStatus.sortOrder,
        isDefault : ticketStatus.isDefault
      });

    }

  }

  

  save(){
    if (this.ticketStatusForm.dirty && this.ticketStatusForm.valid) {
      let status = Object.assign({}, this.ticketStatus, this.ticketStatusForm.value);
      //TODO:call service to detele the current TicketStatus
      this.isSaving= true;
      let msg = `New TicketStatus [${status.name}] has been created.`;
      if (status.id > 0){
        msg = `[${status.name}]] TicketStatus has been updated.`;
      }
      this._service.save(status).subscribe(
          data => {

              // for (let i:number=0; i<100000000000; i++){
              //   let d= i++;
              // }
              console.log(data);
              this.notify("Save Ticket Status",msg);
              this.openSnackBar('Successfully saved');
              this.onSaveComplete();
              this.isSaving= false;
          },
          (error:any) => {
            this.errorMessage = <any>error;
            this.isSaving= false;
          }
      )

      
    }else if (!this.ticketStatusForm.dirty) {
        this.onSaveComplete();
        this.isSaving= false;            
    }    
  }

  onSaveComplete(): void {
        // Reset the form to clear the flags
        this.ticketStatusForm.reset();
        this.router.navigate(['/status']);
    }

  delete(){
    if (this.ticketStatusForm.valid) {
      let status = Object.assign({}, this.ticketStatus, this.ticketStatusForm.value);
      this.confirmService
        .confirm('Delete Confirmation', 'Are you sure to delete this Status?', this.viewContainerRef)
        .subscribe( 
          result => {
          if (result ){
            //TODO:call service to detele the current TicketStatus

            this.isSaving= true;
            this._service.delete(status.id).subscribe(
                data => {

                    console.log(data);
                    this.notify("Delete Ticket Status",`[${status.name}] TicketStatus has been deleted.`)
                    this.openSnackBar('Successfully deleted');
                    this.onSaveComplete();
                    this.isSaving= false;
                },
                (error:any) => {
                  this.errorMessage = <any>error;
                  this.isSaving= false;
                }
            )
          }
      
    });
    }else{

    }

    
  }

  openSnackBar(message) {
    let config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    this.snackBar.open(message, this.action && this.actionButtonLabel, config);
  
  }

  onBack(): void {
        this.router.navigate(['/status']);
    }
}