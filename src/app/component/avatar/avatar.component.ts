import { Component, Input } from "@angular/core";

@Component({
    selector: 'avatar-comp',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
    @Input() name: string = 'Unknown User';
    @Input() picture: string | undefined = '/assets/blank.webp';
    @Input() message: string = '';
    @Input() size: string = '62';
    @Input() timestamp: string = '';
}