


export interface CurrentUser {
    userName: string;
    fullName: string;
    isAdmin: boolean;
    accessToken: string;
    expiresIn: Date;
    tokenType: string;
}

export enum MessageType { INFO = 1, WARNING = 2, ERROR =3 }

export class MessageModel{
    public messageType:MessageType = MessageType.INFO;
    public messageIcon:string ="";
    public messageText:string =""; 
}

export enum NotificationType { NOTIFY = 1, LOG = 2 }

export interface Notification {
    type: NotificationType;
    component: string;
    action: string;
    message: string;
    time: Date;
}

export interface TicketStatus {
    id: number;
    name: string;
    sortOrder: number;
    isDefault : number
}

export interface Ticket {
    id: number;
    description: string;
    applicationURL:string
    organizationName:string;
    categoryId:number;
    categoryName:string;
    projectId:number;
    projectName: string;
    priorityId:number;
    priorityName:string;
    statusId:number;
    statusName:string;
    reportedUserName:string;
    assignedUserName:string
    lastUpdatedUserName:string;
    reportedDate:Date;
    lastUpdatedDate: Date;
}
