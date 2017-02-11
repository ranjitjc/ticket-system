import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import {NotificationService } from '../shared/notification/notification.service';
import { environment } from '../../environments/environment';

import { Notification, NotificationType} from '../model/models';


@Injectable()
export class ChatService {

    currentState = SignalRConnectionStatus.Disconnected;
    connectionState: Observable<SignalRConnectionStatus>;

    //setConnectionId: Observable<string>;
    sendMessage: Observable<string>;

    private connectionStateSubject = new Subject<SignalRConnectionStatus>();

    //private setConnectionIdSubject = new Subject<string>();
    private sendMessageSubject = new Subject<string>();

    private server: ChatServer;
    private connection: ChatSignalR;

    constructor(
        private http: Http,
        private _notifications: NotificationService
    ) {
        this.connectionState = this.connectionStateSubject.asObservable();

        //this.setConnectionId = this.setConnectionIdSubject.asObservable();
        this.sendMessage = this.sendMessageSubject.asObservable();
        this.baseUrl = environment.realTimeURL ;
     }

    baseUrl:string;

    start(debug: boolean): Observable<SignalRConnectionStatus> {

        
        var self = this;
        $.getScript(self.baseUrl + '/hubs', function (this) {
            $.connection.hub.url = self.baseUrl;
            $.connection.hub.logging = debug;

            self.connection = <ChatSignalR>$.connection;
            let chatHub = self.connection.chat;
            self.server = chatHub.server;

            chatHub.client.newMessage = chatMessage => self.onSendChatMessage(chatMessage);
   
            $.connection.hub.start()
                .done(response => {
                    self.setConnectionState(SignalRConnectionStatus.Connected)
                    //chatHub.server.sendMessage("Hello from Client!!!");
                }
                )
                .fail(error => self.connectionStateSubject.error(error));

            return self.connectionState;

        });

        return self.connectionState;

    }

    private setConnectionState(connectionState: SignalRConnectionStatus) {
        console.log('ChatService:connection state changed to: ' + connectionState);
        this.currentState = connectionState;
        this.connectionStateSubject.next(connectionState);
    }

    private onSendChatMessage(realTimeMessage: any) {
        console.warn('ChatService:onSendChatMessage(msg):' + realTimeMessage);
        this.sendMessageSubject.next(realTimeMessage);

        this._notifications.publish(realTimeMessage);
    }

    // Server side methods
    // public subscribeToChat() {
    //     this.server.subscribe();
    // }

    // public unsubscribeFromChat() {
    //     this.server.unsubscribe();
    // }

}

export interface ChatSignalR extends SignalR {
    chat: ChatProxy
}

export interface ChatProxy {
    client: ChatClient;
    server: ChatServer;
}


export interface ChatClient {
    //setConnectionId: (id: string) => void;
    newMessage: (msg: Notification) => void;
    //addFeed: (feed: Feed) => void;
    //addChatMessage: (chatMessage: ChatMessage) => void;
}

export interface ChatServer {
    subscribe(): void;
    unsubscribe(): void;
    sendMessage: (msg: string) => void;
}


export enum SignalRConnectionStatus {
    Connected = 1,
    Disconnected = 2,
    Error = 3
}

export interface ChatMessage {
    MatchId: number;
    Text: string;
    CreatedAt: Date;
}