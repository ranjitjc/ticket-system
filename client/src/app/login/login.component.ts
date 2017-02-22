import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from '../services/services.module';

import { login, CurrentUser, MessageType, MessageModel } from '../model/models'

//shared
import { GenericValidator, NotificationService } from '../shared/shared.module';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    private title = 'Login';

    loginForm: FormGroup;
    
    // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

    isProcessing = false;
    isError = false;
    message: MessageModel;
    error = '';

    constructor(private fb: FormBuilder,
        private _router: Router,
        private viewContainerRef: ViewContainerRef,
        private _authenticationService: AuthenticationService) {

        this.validationMessages = {
            userName: {
                required: 'UserName is required.',
                minlength: 'UserName must be at least five characters.',
                maxlength: 'Username cannot exceed 20 characters.'
            },
            password: {
                required: 'Password is required.',
                minlength: 'Password must be at least five characters.',
                maxlength: 'Password cannot exceed 20 characters.'
            }
        };

         // Define an instance of the validator for use with this form, 
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

    }


    login() {
        if (this.loginForm.dirty && this.loginForm.valid) {
            let login: login = this.loginForm.value;
            this.isProcessing = true;
            this.isError = false;
            
            // Observable.interval(3000).subscribe(
            // a=>
            this._authenticationService.loginForms(login.userName, login.password)
                .subscribe(
                user => {
                    if (user) {
                        this._router.navigate(['/']);
                    } else {
                        this.message = {
                            messageType: MessageType.ERROR,
                            messageIcon: "error",
                            messageText: 'Username or password is incorrect'
                        }
                        this.isProcessing = false;
                        this.isError = true;
                    }
                },
                e => {
                    this.message = {
                        messageType: MessageType.ERROR,
                        messageIcon: "error",
                        messageText: 'Username or password is incorrect'
                    }
                    this.isProcessing = false;
                    this.isError = true;
                })

            //)
        }
    }


    ngOnInit() {
        // reset login status
        this._authenticationService.logout();

        this.loginForm = this.fb.group({
            userName: ['', [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)]
            ],
            password: ['', [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)]
            ]
        });

        this.message = {
                            messageType: MessageType.ERROR,
                            messageIcon: "Info",
                            messageText: 'Enter user Credentials!'
        }
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        //Merge the blur event observable with the valueChanges observable
        Observable.merge(this.loginForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.loginForm);
        });
    }

}
