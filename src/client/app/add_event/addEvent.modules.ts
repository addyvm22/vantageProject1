import { NgModule } from '@angular/core';
import { AddEventService} from './addEvent.services'
import { AddEventComponent} from './addEvent.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes }   from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';
//import { NgbdDatepickerPopup } from '../DatePicker/datepicker-popup';

const routes : Routes =
[ {path:'', component: AddEventComponent, canActivate: [AuthGuard] }];

@NgModule({
    imports:[
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers:
    [
        AddEventService 
    ],
    declarations:[ 
        AddEventComponent,
        //NgbdDatepickerPopup
    ]
})


export class AddEventModule{}



