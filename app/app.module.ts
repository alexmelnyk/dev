/**
 * Created by leha on 15.12.16.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule}  from '@angular/forms';

import { AppComponent }  from './components/app-component/app.component';
import { TaskDetail }  from './components/task-detail/task-detail.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        TaskDetail
    ],
    bootstrap:    [
        AppComponent,
        TaskDetail
    ]
})

export class AppModule { }