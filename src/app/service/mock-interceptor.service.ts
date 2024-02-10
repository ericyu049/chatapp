import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as data from '../mock-data/data';

const urls = [
    {
        url: "http://localhost:8080/api/friends",
        method: 'GET',
        getData: () => {
            return data.friends;
        }
    },
    {
        url: "http://localhost:8080/api/sendMessage",
        method: 'POST',
        getData: (request: any) => {
            data.messages.push(request.body);
            return request.body;
        }
    },
    {
        url: "http://localhost:8080/api/getMessages",
        method: 'POST',
        getData: (request: any) => {
            let user1 = request.body.user1;
            let user2 = request.body.user2;
            let messages = data.messages.filter((message: any) => (message.to === user1 && message.from === user2) || (message.to === user2 && message.from === user1));
            console.log(messages);
            return messages;
        }
    },
    {
        url: "http://localhost:8080/api/getRecentMessages",
        method: 'POST',
        getData: (request: any) => {
            let user1 = request.body.user1;
            let messages;
            messages = data.messages.filter((message: any) => (message.to === user1) || (message.from === user1));
            const latestMessages: any = {};
            messages.forEach((message) => {
                const otherUser = message.to === user1 ? message.from : message.to;
                // Check if the current message is the latest for the other user
                if (!latestMessages[otherUser] || message.timestamp > latestMessages[otherUser].timestamp) {
                    latestMessages[otherUser] = message;
                }
            });
            return Object.values(latestMessages).sort((a:any, b:any) => b.timestamp - a.timestamp);
        }
    },
    {
        url: "http://localhost:8080/api/receiveTestMessage",
        method: 'POST',
        getData: (request: any) => {
            data.messages.push(request.body);
            return request.body;
        }
    },
    {
        url: "http://localhost:8080/api/deleteMessage",
        method: 'POST',
        getData: (request: any) => {
            const target = request.body;
            for (let i =0; i<data.messages.length; i ++) {
                if (data.messages[i].message === target.message) {
                    data.messages.splice(i,1);
                }
            }
            return target;
        }
    },

]
@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const element of urls) {
            if (request.method === element.method) {
                if (request.url === element.url) {
                    return of(new HttpResponse({ status: 200, body: element.getData(request) }));
                }
            }
        }
        return next.handle(request);
    }
}