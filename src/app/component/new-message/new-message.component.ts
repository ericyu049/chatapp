import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AppService } from "src/app/service/app.service";
import { ChatTargetStateService } from "src/app/service/chat-target.state";

@Component({
    selector: 'new-message-comp',
    templateUrl: './new-message.component.html',
    styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
    friends: any[] = [];
    selected: any[] = [];
    constructor(private service: AppService, private chatTargetStateService: ChatTargetStateService, private dialogRef: MatDialogRef<NewMessageComponent>) {

    }
    ngOnInit(): void {
        this.service.getFriends().subscribe({
            next: (friends: any) => {
                this.friends = friends;
            }
        })
    }
    onSelect(friend: any) {
            this.selected.pop();
            this.selected.push(friend);
    }
    sendMessage() {
        console.log(this.selected[0])
        this.chatTargetStateService.setChatTarget(this.selected[0]);
        this.dialogRef.close();
    }
    cancel() {
        this.dialogRef.close();
    }
}