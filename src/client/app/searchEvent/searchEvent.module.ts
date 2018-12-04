
import { NgModule } from "@angular/core";
import { CommonModule} from '@angular/common';
import { SearchEventService } from "./searchEvent.service";
import { SearchEventComponent } from "./searchEvent.component";
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchEventPipe } from './searchEvent.pip'; 

const routes : Routes =
[ {path:'', component: SearchEventComponent, canActivate: [AuthGuard] }];

@NgModule({
    imports:[
        
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers:
    [
        SearchEventService 
    ],
    declarations:[ 
        SearchEventComponent,
        SearchEventPipe
        //NgbdDatepickerPopup
    ]
})
export class SearchEventModule{

}