import { Injectable } from '@angular/core';
import { CookieService } from '../shared/services/cookie.service';
import { HttpService } from '../shared/services/http.service';

@Injectable()

export class AddEventService{

    constructor(private httpService: HttpService, private cookieService: CookieService) {

    }

    //    saveEvent(data) {
    //        let headers = new Headers();
    //        headers.append('Content-Type', 'application/json');
    //        console.log(data);
    //        return this.http.post('/api/event', JSON.stringify(data),
    //            { headers: headers })
    //            .map(res => res.json());
    //    }


    saveEvent(data) {
        /*this.httpService.makeHttpGetRequestWithoutToken('assets/datastore/temp.json')
        .subscribe((response) => { 
             console.log("Data", response);
           // successCB(response.json());
        }, (error) => {
            console.log("Error", error);
           // errorCB(error);
        });
        */
      // this.httpp
        
        this.httpService.makeHttpPostRequestWithoutToken('assets/datastore/event.json', data)
            .subscribe((response: any) => {
                let data = response.json();
                console.log(data);
            },
            (error: any) => {
            });
        
    }
}

/*
 saveEvent(data, successCB, errorCB) {
        this.httpService.makeHttpPostRequestWithoutToken('http://localhost:8080/api/event', data)
            .subscribe((response: any) => {
                let data = response.json();
                console.log(data);
            },
            (error: any) => {
            });

    }
*/

//httpService.makeHttpGetRequestWithoutToken('assets/datastore/booking.json')