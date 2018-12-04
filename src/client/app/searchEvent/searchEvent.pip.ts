import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'searchEvent'
})

export class SearchEventPipe implements PipeTransform{
    
    
    transform(value: any, 
        filterString: string, column: string , 
        no_seats:string, nos:string,
        startD: string, start_date,
        endD: string, end_date
        ):any
    {
        console.log("Fileter Name", filterString);
        console.log(" Column", column);

        console.log("Start Date", startD, start_date);
        console.log("Start Date", endD, end_date);

        if(value.lenght == 0){
            return value;
        }
        const result = [];
        for (const item of value){
            //debugger
            
            if(item[filterString] == column)
            {
                if(item[no_seats] == nos)
                {
                    console.log("In..");  
                    // console.log(Date.parse(item["start_date"]));
                    // console.log(Date.parse(start_date));  
                    // console.log(Date.parse(item["start_date"]) > Date.parse(start_date));
                    // debugger
                    if(Date.parse(item["start_date"]) < Date.parse(start_date))
                     {

                        //result.push(item);
                         if(Date.parse(item[endD]) < Date.parse(end_date))
                             console.log("Inside");
                             result.push(item);
                     }
                    //date1.toDateString('YYYY MM DD HH:MM')l
                   
                    //result.push(item); 
                }  
            }
            
        }
        console.log(result);
        return result;
    }
    
} 