import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    url = 'http://localhost:8080';

    constructor(private http: HttpClient) {
        
    }
    getFriends() {
        return this.http.get(this.url + '/api/friends', {responseType: 'json', reportProgress: true});
    }
    sendMessage(request: any) {
        return this.http.post(this.url + '/api/sendMessage', request, {responseType: 'json', reportProgress: true});
    }
    getMessages(request: any) {
        return this.http.post(this.url + '/api/getMessages', request, {responseType: 'json', reportProgress: true});
    }
    getRecentMessages(request: any) {
        return this.http.post(this.url + '/api/getRecentMessages', request, {responseType: 'json', reportProgress: true});
    }
    receiveTestMessages(request: any) {
        return this.http.post(this.url + '/api/receiveTestMessage', request, {responseType: 'json', reportProgress: true});
    }
    deleteMessage(request: any) {
        return this.http.post(this.url + '/api/deleteMessage', request, {responseType: 'json', reportProgress: true});
    }
}