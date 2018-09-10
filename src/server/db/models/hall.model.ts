/****
 * 
 * @author: Adwait
 * myfirstproject
 *  
 * */

import mongoose = require('mongoose');

let Schema = mongoose.Schema;

export interface IHall{
    name:string;
    location: string;
    city: string;
    country: string;
    no_of_seats: Number;
    //ratings: Number;
    imageUrl: string;

}


export class Hall{
    name:string;
    location: string;
    city: string;
    country: string;
    no_of_seats: Number;
    ratings: Number[];
    imageUrl: string;
    bookingDates: Date[];


    constructor(data: Hall){
        console.log("data, ", data);
        this.name = data.name;
        this.location = data.location;
        this.city = data.city;
        this.country = data.country;
        this.no_of_seats = data.no_of_seats;
        this.ratings = [0,0,0,0,0];
        this.imageUrl = data.imageUrl;
        this.bookingDates = [];
    }
    
}

let hallSchema = new Schema({
    name :      { type : String, unique : true, required: true },
    location :  { type : String, required : true},
    city :      { type : String, required : true},
    country :   { type : String, required : true},
    no_of_seats :{ type : Number, required : true},
    ratings:    { type:[Number]},
    imageUrl:   { type: String},
    bookingDates:{ type: [Date]}
});


export interface HallDocument extends Hall, mongoose.Document{}

export let Halls = mongoose.model<HallDocument>('Hall', hallSchema);