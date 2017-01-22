import { MdDialogRef } from '@angular/material';
import { Component} from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.dialog.html',
    styleUrls: ['./confirmation.dialog.scss'],
})
export class ConfirmationDialog {

    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) {
        this.title="Confirmation"
    }
}
