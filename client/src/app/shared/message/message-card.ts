import { Component , Input, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MessageType, MessageModel } from '../../model/models'

@Component({
    selector: 'message-card',
  templateUrl: './message-card.html',
  styleUrls: ['./message-card.scss'],
})
export class MessageCard implements OnInit{

    @Input()
    message: MessageModel;

    messageClass :string;

    //this._loggedInUser = <BehaviorSubject<CurrentUser>> new BehaviorSubject({});
    private _data = <BehaviorSubject<MessageModel>> new BehaviorSubject<MessageModel>({
        messageType : MessageType.INFO,
        messageIcon : "info",
        messageText: ""
    });

    @Input()
    set data(value) {
        this._data.next(value);
    };

    get data() {
        return this._data.getValue();
    }


    ngOnInit() {

         this._data
            //.takeWhile(() => !this.groupPosts) // unsubscribe once groupPosts has value
            .subscribe(x => {
                    if (this.data.messageType == MessageType.INFO)
                        this.messageClass ="message-card card-info"
                    else if (this.data.messageType == MessageType.WARNING)
                        this.messageClass ="message-card card-warn"
                    else
                        this.messageClass ="message-card card-error"
            });

       
    }

}

