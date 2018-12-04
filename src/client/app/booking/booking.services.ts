import {Injectable} from '@angular/core';
import {CookieService} from '../shared/services/cookie.service';
import { HttpService} from '../shared/services/http.service';
import { Headers, Http} from '@angular/http';


const ROUTE_URI = '/hall/';
@Injectable()
export class BookingService {

    constructor(private httpService: HttpService, private cookieService: CookieService) {

    }
    onInit()
    {
        console.log("Fetch Data");
    }
    getBookings(successCB, errorCB) {
        this.httpService.makeHttpGetRequestWithoutToken('assets/datastore/booking.json')
        .subscribe((response) => { 
             
            successCB(response.json());
        }, (error) => {
            errorCB(error);
        });
    }
}