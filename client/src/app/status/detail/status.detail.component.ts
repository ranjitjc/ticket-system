import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';

import { ConfirmDialog } from '../../shared/confirm.dialog'

import { StatusService, TicketStatus } from '../../services/status.service';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Subscription }       from 'rxjs/Subscription';



@Component({
  selector: 'app-status-detail',
  templateUrl: './status.detail.component.html',
  styleUrls: ['./status.detail.component.scss']
})
export class StatusDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading:Boolean;
  ticketStatus: TicketStatus;
  private sub: Subscription;
  ticketStatusForm: FormGroup;
  SortOrders : number[];

  dialogRef: MdDialogRef<ConfirmDialog>;
  lastCloseResult: Number;
  config: MdDialogConfig = {
    disableClose: true,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              public snackBar: MdSnackBar,
              public dialog: MdDialog,
              private _service: StatusService) { 
    this.isLoading= true;

  this.SortOrders = [];
    

    for (var _i = 0; _i < 20; _i++) {
        this.SortOrders.push(_i);
    }

  }

    ngOnInit() {
       this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                console.log('id :' + id);
                this.getTicketStatus(id);
        });

        this.ticketStatusForm = this.fb.group({
          Name : '',
          SortOrder: 0,
          IsDefault : 0
        });

    }

  ngAfterViewInit(): void {
        // // Watch for the blur event from any input element on the form.
        // let controlBlurs: Observable<any>[] = this.formInputElements
        //     .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // // Merge the blur event observable with the valueChanges observable
        // Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        //     this.displayMessage = this.genericValidator.processMessages(this.productForm);
        // });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

  
  getTicketStatus(id:Number){
    this._service.GetById(id).subscribe(data => {
            this.onTicketStatusRetrieved(data);
            this.isLoading= false;
            console.table(data);
        })
  }

  onTicketStatusRetrieved(ticketStatus: TicketStatus): void {
      this.ticketStatusForm.patchValue({
        Name : ticketStatus.name,
        SortOrder: ticketStatus.sortOrder,
        IsDefault : ticketStatus.isDefault
      })

  }

   message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 1000;

  save(){
    this.openSnackBar('Successfully saved');
    this.router.navigate(['/status']);
  }

  delete(){

    this.dialogRef = this.dialog.open(ConfirmDialog, this.config);
    this.dialogRef.componentInstance.Title = "Delete Confirmation.";
    this.dialogRef.componentInstance.Message = "Are you sure to delete this Status?";
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.lastCloseResult = result;
      this.dialogRef = null;
      if (this.lastCloseResult ==1 ){
        this.openSnackBar('Successfully deleted');
        this.router.navigate(['/status']);
      }
    });
    
  }

  openSnackBar(message) {
    // this.snackBar.openFromComponent(MessageSnackComponent, {
    //   duration: 500,
    // });

    let config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    this.snackBar.open(message, this.action && this.actionButtonLabel, config);
  
  }

  onBack(): void {
        this.router.navigate(['/status']);
    }
}



@Component({
  selector: 'snack-bar-component',
  template: `Confirmed!!!`,
  //styleUrls: ['./snack-bar-component-example-snack.css'],
})
export class MessageSnackComponent {}

