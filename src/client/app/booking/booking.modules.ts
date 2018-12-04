import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent} from './booking.components';
import { BookingService} from './booking.services';
import { AuthGuard} from '../shared/services/auth-guard.service';
import { SelectName } from './select.pipe'; 
import { Record } from './record.pip';



const routes: Routes = [
    {path:'', component: BookingComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)],
    providers: [
        BookingService
    ],
    declarations: [
        BookingComponent,
        SelectName,
        Record
    ]
})
export class BookingModule { }