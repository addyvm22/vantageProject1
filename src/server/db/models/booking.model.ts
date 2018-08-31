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
    hallId : number;
    userId: number;
    startDateTime: Date;
    endDateTime: Date;
    status : boolean;//true is available, false is not
    //or maybe declare it as a string if cancelled or not if needed


    constructor(data: Booking){
        console.log("data, ", data);
        this.hallId = data.hallId;
        this.userId = data.userId;
        this.startDateTime = data.startDateTime;
        this.endDateTime = data.endDateTime;
        this.status = data.status;
    }
    
}

let bookingSchema = new Schema({
    hallId : { type:Number, required:true},
    userId: { type:Number, required: true},
    startDateTime: {type: Date, required: true},
    endDateTime: {type: Date, required: true},
    status : {type: Boolean, required: true}
});


export interface BookingDocument extends Booking, mongoose.Document{}

export let Bookings = mongoose.model<BookingDocument>('ConfHall', bookingSchema);