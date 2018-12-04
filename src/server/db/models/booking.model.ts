/****
 * 
 * @author: Adwait
 * 
 * */
import mongoose = require('mongoose');

let Schema = mongoose.Schema;


export interface IBooking{
    hallId : number;
    userId: number;
    startDateTime: Date;
    endDateTime: Date;
    status : boolean;
}




//new change

export class Booking{
    
    hallId : any;
    userId: any;
    startDateTime: Date;
    endDateTime: Date;
    status : boolean;//true is available, false is not
    //or maybe declare it as a string if cancelled or not if needed


    constructor(data: Booking){
        console.log("printing data while creating booking: data, ", data);
        this.hallId = data.hallId;
        this.userId = data.userId;
        this.startDateTime = data.startDateTime;
        this.endDateTime = data.endDateTime;
        this.status = data.status;
    }

}

let bookingSchema = new Schema({
    hallId : { type: String ,required:true},
    userId: { type: String, required: true},
    startDateTime: {type: Date, required: true},
    endDateTime: {type: Date, required: true},
    status : {type: Boolean, required: true}
});


export interface BookingDocument extends Booking, mongoose.Document{}

export let Bookings = mongoose.model<BookingDocument>('Bookings', bookingSchema);