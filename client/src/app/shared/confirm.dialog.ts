import { Component} from '@angular/core';
import { MdDialogRef} from '@angular/material';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm.dialog.html',
  styleUrls:['./confirm.dialog.scss']
})
export class ConfirmDialog { 
    public Title:string;
    public Message:string;
    constructor(public dialogRef: MdDialogRef<ConfirmDialog>) { }
}
