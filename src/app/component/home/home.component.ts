import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, firstValueFrom, tap } from "rxjs";
import { ChatTargetStateService } from "src/app/service/chat-target.state";
import { RefreshStateService } from "src/app/service/refresh.state";
import { AppService } from "../../service/app.service";
import { NewMessageComponent } from "../new-message/new-message.component";
import { pictureMap } from "../model/picture.map";
@Component({
    selector: 'home-comp',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    chatTarget: any = undefined;
    messageSubject = new BehaviorSubject<any>(null);
    messages$ = this.messageSubject.asObservable();
    pm = pictureMap;
    constructor(private service: AppService, private chatTargetStateService: ChatTargetStateService, private refreshStateService: RefreshStateService, private dialog: MatDialog) {

    }
    ngOnInit() {
        this.chatTargetStateService.getChatTarget().subscribe({
            next: (friend: any) => {
                if (friend !== undefined) {
                    this.chatTarget = friend;
                }
            }
        })
        this.refreshStateService.getRefresh().subscribe({
            next: (state: any) => {
                if (state) {
                    this.getRecentMessages();
                }
            }
        })
    }
    newMessage() {
        this.dialog.open(NewMessageComponent, {
            height: '500px',
            width: '600px',
        });
    }
    getRecentMessages() {
        this.service.getRecentMessages({ user1: 'Oreo' }).subscribe({
            next: (messages: any) => {
                this.messageSubject.next(messages);
                this.refreshStateService.setRefresh(false);
            }
        });
    }

    receiveMessage() {
        const friendArray = Array.from(pictureMap.keys()).filter(x => x != 'Oreo');
        const randomIndex = Math.floor(Math.random() * friendArray.length);
        const randomFriend = friendArray[randomIndex];
        const request = {
            from: randomFriend,
            to: 'Oreo',
            timestamp: new Date(),
            message: this.generateRandomString(10)
        }
        this.service.receiveTestMessages(request).subscribe({
            next: (messages: any) => {
                this.refreshStateService.setRefresh(true);
            }
        });
    }
    generateRandomString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }
    async openChat(message: any) {
        const friend = message.to === 'Oreo' ? message.from : message.to;
        const pic = this.pm.get(friend);
        this.chatTargetStateService.setChatTarget({ username: friend, picture: pic });
    }
}