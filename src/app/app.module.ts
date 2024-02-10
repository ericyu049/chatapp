import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HomeComponent } from './component/home/home.component';
import { AppService } from './service/app.service';
import { HttpMockRequestInterceptor } from './service/mock-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarComponent } from './component/avatar/avatar.component';
import { ChatComponent } from './component/chat/chat.component';
import { NewMessageComponent } from './component/new-message/new-message.component';
import { ChatTargetStateService } from './service/chat-target.state';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { RefreshStateService } from './service/refresh.state';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AvatarComponent,
    ChatComponent,
    NewMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PickerModule
  ],
  providers: [
    AppService,
    ChatTargetStateService,
    RefreshStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
