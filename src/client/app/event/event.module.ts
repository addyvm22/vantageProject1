import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { EventComponent} from './event.component';
import {EventService } from './event.service';
import { AuthGuard } from '../shared/services/auth-guard.service';
const routes: Routes = [
    {path:'', component: EventComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)],
    providers: [
        EventService
    ],
    declarations: [
        EventComponent
    ]
})
export class EventModule { }