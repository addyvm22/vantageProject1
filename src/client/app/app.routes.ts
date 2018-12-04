import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './no-content';
import { RegisterComponent } from './register';


import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
    { path: '', component: RegisterComponent },
    { path: 'event', loadChildren: './event/event.module#EventModule' },
    { path: 'user', loadChildren:'./user/user.modules#UserModule'},
    { path: 'booking', loadChildren:'./booking/booking.modules#BookingModule'},
    { path: 'addEvent', loadChildren:'./add_event/addEvent.modules#AddEventModule'},
    { path: 'searchEvent', loadChildren: './searchEvent/searchEvent.module#SearchEventModule' },
    { path: '**', component: NoContentComponent }
];
