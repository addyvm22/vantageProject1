import { Injectable } from '@angular/core';
import { CookieService } from '../shared/services/cookie.service';
import { HttpService } from '../shared/services/http.service';
import { Headers, Http} from '@angular/http';


const ROUTE_URI = '/hall/';
@Injectable()
export class EventService {

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


    saveEvent(data, successCB, errorCB) {
        this.httpService.makeHttpPostRequestWithoutToken('http://localhost:8080/api/event', data)
            .subscribe((response: any) => {
                let data = response.json();
                console.log(data);
            },
            (error: any) => {
            });

    }

    // add_event(event){
    //     return this.http.post(`${ROUTE_URI}add`,
    //     JSON.stringify(event),
    //     HEADER);
    // );
    //}
   

}