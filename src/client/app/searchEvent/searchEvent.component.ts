import { Component } from "@angular/core";
import { SearchEventService} from './searchEvent.service';
import { LocalStorageService } from '../shared/services/localStorage.service';
import { AppState } from '../app.service';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingModel } from './booking.model';

declare var jQuery:any;

@Component({
    templateUrl:'./searEvent.component.html',
    selector: 'searchEvent-page',
    providers: [SearchEventService]
})
export class SearchEventComponent
{

    searchBy :string = "location";
    value : string;
    nos: string;
    startDate: string;
    endDate: string;
    


    event_list: Array<any> = [];
    constructor(private localStorageService: LocalStorageService, private appState: AppState) {
        //this.userName = appState._state.userData.username;
        //console.log(appState._state.userData.username);
        console.log(appState);

    }
   // let user = appState.get('userData').role; // == 'ROLE_ADMIN
    selectName = this.appState._state.userData.username;

    ngOnInit() {
        console.log("OnInit");
        this.event_list = this.localStorageService.getEvents()
        console.log(this.event_list);


        jQuery('#datetimepicker2').datetimepicker({
            minDate: new Date()
        });

       
         jQuery('#datetimepicker1').datetimepicker({  
        
            minDate:new Date()
            
         });

         jQuery('#datetimepicker2').on("dp.change",(e) => {
            console.log(e);
            console.log("Second ..",e.date._d);
            this.endDate = e.date._d;
            
            //jQuery('#datetimepicker2').data("DateTimePicker").maxDate(e.date);
        });

        jQuery('#datetimepicker1').on("dp.change", (e)=>{
            //console.log(e.date._d);
            this.startDate = e.date._d;
           // console.log("Called..", this.startDate);
            //console.log("Start Date:..",this.startDate);
        });

    }

    addBooking(booking)
    {
        console.log("Booking:", booking);
        console.log(+new Date()+'');
        console.log( "User state", this.appState._state.userData.username);
        console.log("Hall", booking.name);
        console.log("Start Date", booking.start_date);
        console.log("End Date", booking.end_date);
        let bookingModel = new BookingModel(+new Date()+'',
                            this.appState._state.userData.username,
                           booking.name,
                           booking.start_date,
                           booking.end_date );
        
        //console.log(booking);
       //console.log(bookingModel);
         this.localStorageService.saveBooking(bookingModel);
       
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

    
  

    
}
