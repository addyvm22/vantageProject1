import { Component } from '@angular/core';
import { BookingService } from './booking.services';
//import { AppState } from '../../../app.service';
import { BookingModel} from './booking.model';
import { getDefaultService } from 'selenium-webdriver/chrome';
import { AppState } from '../app.service';
import { resolve } from 'path';

import { LocalStorageService} from '../shared/services/localStorage.service';



@Component({
    selector: "booking_page",
    templateUrl: './booking.component.html',

})
export class BookingComponent {
     userName: string;
     //selectName ='';

   /* appStatus = new Promise((resolve, reject)=>
    {
        setTimeout(() => {
            resolve('stable');   // {{appStatus| async}}
        }, 2000);
    }) */

    booking_list: Array<any> = [];
    constructor(private bookingService: BookingService, 
                private appState: AppState,
                private localStorageService: LocalStorageService
            ) {
        console.log(appState);

    }
   // let user = appState.get('userData').role; // == 'ROLE_ADMIN
    selectName = this.appState._state.userData.username;

    ngOnInit() {
        console.log("OnInit");
        this.getBookings();
    }
    

    getBookings() {
       this.booking_list = this.localStorageService.getBooking();
        /* this.bookingService.getBookings((bookingsList) => {
            this.booking_list = bookingsList;
            console.log(this.booking_list);
        }, () => {
            console.log('Internal server error');
        });*/
    }

    newDate(date)
    {
        
        let date1 = new Date(date);
       // console.log("called.",date1);
        let now = new Date();
       // console.log(now);
        if ( date1 > now)
        {
            return false;
        } else{
            return true;
        }
    }
    onCancel()
    {

    }
    onEdit(booking)
    {
        
       // this.localStorageService.saveBooking(booking);
        
    }
    onDelete(booking)
    {   
        let date1 = new Date(booking.start_date_time)
        let now = new Date();
        debugger
        if(date1 < now)
        {
            console.log("Date");
        }
        else{
            console.log("Clicked..", booking._id, booking.Hall, booking);
            this.localStorageService.editBooking(booking._id);
        }
        //console.log("Clickedd..", id.Hall);
    }
    
    

}
/*
onSave(){
    this.serverce.storedata(this.servers).subscribe(
        (response) => console.log(resp),
        (error) => console.log(error)
    );
}

storedata(serve: any[])
{
    return this.http.post('https://mdfsite.dfd.json', serve);
}

*/
