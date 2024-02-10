import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class RefreshStateService {

    private refreshSubject !: BehaviorSubject<any>;
    private refresh$ !: Observable<any>;

    constructor() {
        this.refreshSubject = new BehaviorSubject(false)
        this.refresh$ = this.refreshSubject.asObservable();
    }
    getRefresh() {
        return this.refresh$;
    }
    setRefresh(state: any) {
        this.refreshSubject.next(state);
    }
}