
import { Component } from '@angular/core';
import {EventService } from './event.service';

class Event {
    name: String;
    description: String;
}

@Component({
    selector: "event_page",
    templateUrl: './event.component.html',
    providers: [EventService]

})
export class EventComponent {
    event: Event;
    constructor(private eventService: EventService) {
        this.event = new Event();
    }

    addEvent() {
        console.log(this.event);
        this.eventService.saveEvent(this.event, () => {
        },
            () => {
            });
    }
}
/*import { Component } from '@angular/core';
import {EventService } from './event.service';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';

import { FormModel } from './form.model';
import { Event } from './event.model';

@Component({
    selector: "event_page",
    templateUrl: './event.component.html',
    providers: [EventService]

})
export class EventComponent {
    event: Event;
    //public eventForm: FormGroup;
    

    constructor(private eventService: EventService, private builder: FormBuilder) {
        //this.event = new Event();
    }
    onNgInit()
    {
           let event = new FormModel('', '', '', '', '', '' );
           /*this.eventForm = this.builder.group({
                name: [event.name,[<any>Validators.required, <any>Validators.minLength(4)]],
                location: [event.location,[<any>Validators.required, <any>Validators.minLength(4)]],
                city : [event.city, [<any>Validators.required, <any>Validators.minLength(4)]],
                county: [event.country, [<any>Validators.required, <any>Validators.minLength(4)]],
                no_of_seats: [event.no_of_seats,[<any>Validators.required]],
                imgeUrl:[event.imageUrl,[<any>Validators.required,<any>Validators.minLength(5)]]
           });
           
      
        
        

    }


    addEvent() {
        console.log(this.event);
        this.eventService.saveEvent(this.event, () => {
        },
            () => {
            });
    }
}
*/