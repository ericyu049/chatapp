import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, map, tap } from "rxjs";
import { AppService } from "src/app/service/app.service";
import { RefreshStateService } from "src/app/service/refresh.state";
import { pictureMap } from "../model/picture.map";
@Component({
    selector: 'chat-comp',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges{
    @Input() chatTarget: any;
    @ViewChild('myContextMenuTrigger') trigger!: MatMenuTrigger;
    messageForm !: FormGroup;
    showEmoji: boolean = false;
    myClass: string[] = ['emojiMenu'];
    messageSubject = new BehaviorSubject<any>(null);
    messages$ = this.messageSubject.asObservable();
    pm = pictureMap;
    
    get isValid() { return this.messageForm.valid; }
    constructor(private fb: FormBuilder, private appService: AppService, private refreshStateService: RefreshStateService){

    }
    ngOnInit() {
        this.refreshStateService.getRefresh().subscribe({
            next: data => {
                this.getMessages();
            }
        })
        this.messageForm = this.fb.group({
            message: [null],
        });
        this.getMessages();
    }
    ngOnChanges() {
        this.getMessages();
    }
    getMessages() {
        this.appService.getMessages({
            user1: 'Oreo',
            user2: this.chatTarget.username
        }).pipe(
            map((messages:any) => {return messages.map((item:any) => ({...item, overlay: false}))}),
            tap((messages) => this.messageSubject.next(messages))
        ).subscribe()
    }
    async sendMessage() {
        const request = {
            to: this.chatTarget.username,
            from: 'Oreo',
            timestamp: new Date(),
            message: this.messageForm.value['message']
        }
        await this.appService.sendMessage(request).subscribe();
        this.getMessages();
        this.refreshStateService.setRefresh(true);
    }
    keydownSubmit(event: KeyboardEvent) {
        if (event.key === 'Enter' && this.messageForm.value.message && this.messageForm.value.message.trim() !== '') {
            this.sendMessage();
            event.preventDefault();
            this.messageForm.reset();
            return;
        }
        else return;
    }
    nudge() {
    }
    openEmoji() {
        this.showEmoji = !this.showEmoji;
    }
    addEmoji(event: any) {
        const message = (this.messageForm.value.message ? this.messageForm.value.message : '') + event.emoji.native;
        this.messageForm.controls['message'].setValue(message);
    }
    rightClick(event: any) {
        event.preventDefault();
        console.log(event);
        this.trigger.openMenu();
    }
    deleteMessage(message: any) {
        this.appService.deleteMessage(message).subscribe({
            next: data => {
                this.refreshStateService.setRefresh(true);
            }
        })
    }
}