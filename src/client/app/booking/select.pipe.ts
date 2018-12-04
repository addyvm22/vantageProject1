import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'selectName'
    //,
    //pure: false
})


export class SelectName implements PipeTransform {

    transform(value: any, limit: number )
    {
        return value.substr(0, limit);
    }


   /* transform(value: any, ...args: any[]) {
        throw new Error("Method not implemented.");
    }*/

}