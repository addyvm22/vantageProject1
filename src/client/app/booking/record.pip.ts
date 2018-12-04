import { Pipe, PipeTransform } from "@angular/core";
import { AppState } from '../app.service';

@Pipe({
    name: "filterName"
    //,pure: false
})
export class Record implements PipeTransform{
    /*transfer(value: any)
    {

        return 
    }*/

    
    constructor( private appState: AppState) {
        //this.userName = appState._state.userData.username;
        //console.log(appState._state.userData.username);
        //console.log(appState);

    }

    transform(value: any, filterString: string, column: string ):any
    {

        filterString = filterString.toLocaleLowerCase()
        if( this.appState._state.userData.role == 'ROLE_ADMIN')
        {
            console.log( this.appState._state.role);
            return value;
        }
        if(value.lenght == 0){
            return value;
        }
        const result = [];
        for (const item of value){
            
            if(item[column] == filterString)
            {
                result.push(item);   
            }
            
        }
        return result;
    }

}