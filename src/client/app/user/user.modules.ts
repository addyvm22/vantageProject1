import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
// import { UserService } from './user.services';

const routes: Routes = [
    { path:'', component:UserComponent }
];

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        // UserService
    ],
    declarations:[
        UserComponent
    ]
})

export class UserModule{}