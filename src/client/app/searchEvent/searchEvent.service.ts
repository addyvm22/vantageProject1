import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchEventService{

            
    private booking = 'app/booking'

    constructor(private http: Http){

    }

    getData()
    {
        this.http.get(this.booking)
        .toPromise()
        .then(response => console.log(response));
    }
    
}