import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Form, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';


import { AuthenticationService, TicketService } from '../../services/services.module';

import { CurrentUser, Ticket, MessageModel, MessageType, TicketStatus } from '../../model/models'


//shared
import { NumberValidators, GenericValidator, ConfirmationService, NotificationService } from '../../shared/shared.module';

declare var _: any;

@Component({
  selector: 'ticket-detail',
  templateUrl: './ticket.detail.component.html',
  styleUrls: ['./ticket.detail.component.scss']
})
export class TicketDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private currentUser: CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  isLoading: boolean = false;
  isSaving: boolean = false;
  isError: Boolean = false;
  ticket: Ticket;
  ticketId:number;
  statuses: TicketStatus[];
  projects: any[];
  categories: any[];
  priorities: any[];
  message: MessageModel;
  private sub: Subscription;
  ticketForm: FormGroup;
  form: Form;
  pageTitle: string;
  selected: any = { categoryId : 1 } ;
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private _authService: AuthenticationService,
    private _ticketService: TicketService) {


    this.validationMessages = {
      description: {
        required: 'Description is required.',
        minlength: 'Description must be at least 10 characters.',
        maxlength: 'Description cannot exceed 100 characters.'
      }
    };

    // Define an instance of the validator for use with this form, 
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

    

  }

  ngOnInit() {
    this.emptyTicket()
    this.ticketForm = this.fb.group({
        id: 0,
        applicationURL: '',
        description: ['', [Validators.required, Validators.minLength(10),
        Validators.maxLength(100)]
        ],
        requestedBy: '',
        statusId: 1,
        projectId: 1,
        //categoryId: 7,
        priorityId: [1, [Validators.required]]
      });


    this.sub = this.route.params.subscribe(
      params => {
        this.ticketId = params['id'];
        console.log('ticketId :' + this.ticketId);
        this.loadTicket();
      });

    // this.ticketForm = this.fb.group({
    //       id:[0],
    //       description :  [''],
    //       statusId: [''],
    //       projectId:[''],
    //       categoryId:[''],
    //       priorityId:[''],
    //     });

  }

loadTicket(){
   if (!_.isEmpty(this.currentUser)) {
       this.getTicket();
   }else{
      let subscription =
        this._authService.LoggedInUser.subscribe(
          (currentUser) => {
            //console.log('HomeComponent:ngOnInit.Next :' + JSON.stringify(currentUser) );
            if (!_.isEmpty(currentUser)) {
              this.getTicket();
            } else {
              //Unauthorized

            }
            if (subscription) {
              //console.log('HomeComponent:ngOnInit.unsubscribe.'),
              subscription.unsubscribe();
            }
          },
          (err) =>
            console.log('TicketDetailComponent:ngOnInit.loadTicket() :' + err),
          () => {
            //console.log('HomeComponent:ngOnInit.Completed')
          }
        );
   }
}


  getTicket() {
   
    this._ticketService.GetTicket(this.ticketId).subscribe(
      data => {
        let response: any = data;
        console.log(response);
        this.onTicketRetrieved(response);

        
      },
      (error: any) => {
        this.message = {
          messageType: MessageType.ERROR,
          messageIcon: "error",
          messageText: <any>error
        };
        this.isError = true;
      }
    )
    

  }

  emptyTicket(){
    this.ticket  = {
      id:0, 
      description: '', 
      statusId:0,
      statusName : '',
      applicationURL: '',
      organizationName: '',
      categoryId:0,
      categoryName: '',
      projectId:0,
      projectName: '',
      priorityId:0,
      priorityName: '',
      reportedUserName: '',
      assignedUserName: '',
      lastUpdatedUserName: '',
      reportedDate: new Date(),
      lastUpdatedDate: new Date()};
  }


  onTicketRetrieved(ticketDetail: any): void {

    this.ticket = <Ticket>ticketDetail.ticket;

    //this.categories = ticketDetail.categories.map( s=> { return {id:  s.id.toString(), name: s.name} })
    this.statuses = <any[]>ticketDetail.statuses;
    this.projects = <any[]>ticketDetail.projects;
    this.categories = <any[]>ticketDetail.categories;
    this.priorities = <any[]>ticketDetail.priorities;
    if (this.ticketForm) {
      this.ticketForm.reset();
    }

    if (this.ticket.id === 0) {
      this.pageTitle = 'Add New Ticket Status';
    } else {
      this.pageTitle = `Edit Ticket : ${this.ticket.id}`;

    //  this.ticketForm.patchValue({
    //     id: this.ticket.id,
    //     applicationURL: 'Optional',
    //     description: this.ticket.description,
    //     requestedBy: '{CurrentUser}', disabled: true,
    //     statusId: this.ticket.statusId,
    //     projectId: this.ticket.projectId,
    //     //categoryId: this.ticket.categoryId.toString(),
    //     priorityId: this.ticket.priorityId
    //   });
      //this.selectCategoryId = this.ticket.categoryId.toString();
      //this.selected = { categoryId : this.ticket.categoryId } ;
      //this.ticketForm.controls['categoryId'].patchValue(this.ticket.categoryId.toString());


    }

  }

  save() {

  }

  addComment(){
    
  }

  onBack(): void {
    this.router.navigate(['/ticket']);
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.ticketForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.ticketForm);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}