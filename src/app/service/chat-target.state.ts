import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ChatTargetStateService {

    private chatTargetSubject !: BehaviorSubject<any>;
    private chatTarget$ !: Observable<any>;

    constructor() {
        this.chatTargetSubject = new BehaviorSubject(undefined)
        this.chatTarget$ = this.chatTargetSubject.asObservable();
    }
    getChatTarget() {
        return this.chatTarget$;
    }
    setChatTarget(state: any) {
        this.chatTargetSubject.next(state);
    }
}