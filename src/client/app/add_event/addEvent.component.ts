import { Component} from '@angular/core';
import { AddEventService } from './addEvent.services';
import { FormGroup, FormControl, FormBuilder, Form, Validators} from '@angular/forms';
import { Event} from './add_event_model';
import { FormModel} from './form_model';
import { LocalStorageService } from '../shared/services/localStorage.service';

declare var jQuery:any;

@Component({
    selector:'addEvent_page',
    templateUrl:'./addEvent.component.html',  
    providers: [AddEventService]
})
export class AddEventComponent{

    //var event = 
    public submitted: boolean = false;
    public addEventForm : FormGroup;
    public startDate : string;
    public endDate : string;
       

    constructor(private formBuilder: FormBuilder , 
                private eventService: AddEventService,
                private localStorageService: LocalStorageService
            )
    { }

    
    ngOnInit()
    {
        console.log("Start Add Event");
        //console.log(jQuery('#datetimepicker1'));
        //jQuery('#datetimepicker1').datetimepicker();
        jQuery('#datetimepicker2').datetimepicker({
            minDate: new Date()
        });

       
         jQuery('#datetimepicker1').datetimepicker({  
        
            minDate:new Date()
            
         });

        var event = new FormModel('', '', '', '', '', '', '');

        this.addEventForm = this.formBuilder.group({
          
            name: [event.name, [<any>Validators.required, <any>Validators.minLength(4)]],
            location: [event.name, [<any>Validators.required, <any>Validators.minLength(4)]],
            city: [event.name, [<any>Validators.required, <any>Validators.minLength(4)]],
            country: [event.name, [<any> Validators.required,<any>Validators.minLength(4)]],
            number_of_seats: [event.name, [<any> Validators.required, <any>Validators.minLength(2)]]
         
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

    


    submitData()
    {
        //debugger

       

        this.submitted = true;
        console.log(this.addEventForm.value);
        
        console.log ("start Date", this.startDate);
        console.log (" End Date", this.endDate);
        
        this.submitted = true;
        debugger
        if (this.addEventForm.valid) {
            console.log(this.addEventForm.controls['number_of_seats'].value);
            let eventData = new Event(this.addEventForm.controls['name'].value,
                this.addEventForm.controls['location'].value,
                this.addEventForm.controls['city'].value.toLowerCase(),
                this.addEventForm.controls['country'].value,
                this.addEventForm.controls['number_of_seats'].value,
                new Date(this.startDate).toISOString(),
                new Date(this.endDate).toISOString());
                
            console.log(eventData); 
            this.addEvent(eventData);
        }

    }

    addEvent(event)
    {

        console.log("Event Data:",event);
        console.log(JSON.stringify(event) );
       
        this.localStorageService.saveHall(event);
       

    }
}

////
 /* name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
location: new FormControl('', Validators.compose([Validators.required,Validators.minLength(4)])),
city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
country: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
number_of_seats: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]))
*/
