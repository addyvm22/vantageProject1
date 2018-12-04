import {Component} from '@angular/core';

@Component({
    selector: 'user_page',
    templateUrl:'./user.component.html'

})

export class UserComponent
{
   viewDetails()
   {
       console.log("User Page");
   }
}