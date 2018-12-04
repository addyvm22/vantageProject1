import {InMemoryDbService} from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService{
        createDb()
        {   

            
            const booking = [
                {id: 11, username:'jaggu', Hall: "abc hall", start_date_time:"sept 24, 2018 12:35 PM", end_date_time:"sept 24, 2018 12:35 PM"},
                {id: 12, username:'jaggu', Hall: "ket hall", start_date_time:"nov 28, 2018 12:35 PM", end_date_time:"nov 30, 2018 12:35 PM"},
            ];
            return booking; 
        }

}

//"_id":"b002","username":"jaggu","Hall":"ket hall","start_date_time":"sept 28, 2018 12:35 PM","end_date_time":"sept 30, 2018 12:35 PM"