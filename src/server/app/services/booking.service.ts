"use strict"

import * as express from 'express';
import {Booking, BookingDocument, Bookings} from '../../db/models/booking.model'
import {Halls} from '../../db/models/hall.model'; 

const BASE_URI = 'booking'

export class BookingService{
    constructor(){
    }




    // public book1(hallId:any, userId:any, startDate: Date, endDate: Date): any{
    //     console.log(`hall is being booked`);
    //     return new Promise( function(resolve, reject){
    //         if(startDate>endDate) reject("start date must be before end date");
    //         Halls.findOne({'_id': hallId }, 
    //         (err:any, hall:any)=>{
    //             if(err){
    //                 console.log(err);
    //                 reject(err);
    //             }
    //             if(hall) {
    //                 if(available(hall, startDate, endDate)){
    //                     hall.bookingDates.push(startDate);
    //                     hall.bookingDates.push(endDate);
    //                     hall.bookingDates.sort((d1:any, d2:any) => d1-d2);
    //                     hall.save(function (err:any) {
    //                         if (err) reject(err);
    //                     });
    //                     let bookingData = {
    //                         "hallId": hallId,                        
    //                         "userId": userId,
    //                         "startDateTime": startDate,
    //                         "endDateTime": endDate,
    //                         "status": true
    //                     };

    //                     let booking = new Booking(bookingData);

    //                     Bookings.create(booking, (err:any, data:any)=>{
    //                         if (err) {
    //                             console.log(err);
    //                             reject(err);
    //                         }
    //                         console.log(data);
    //                         resolve(data._id);
    //                     });                        
    //                 }
    //             }
    //         });
    //     });
        

        

    //     function available(hall:any, startDate: any, endDate: any){
    //         var dates = hall.bookingDates.splice(0);
    //         if(dates.indexOf(startDate)!==-1) return false;
    //         dates.push(startDate);
    //         dates.sort((d1,d2)=>d1-d2);
    //         let ind = dates.indexOf(startDate);
    //         if(ind %2==1) return false;
    //         if(ind==(dates.length-1)) return true;
    //         return ( endDate < dates[ind+1]);
    //     }
    // }


    public book(hallId:any, userId:any, startDate: Date, endDate: Date): any{
        console.log(`@service: hall is being booked`);
        return new Promise( function(resolve, reject){
            if(startDate>endDate) reject("start date must be before end date");
            console.log("starting aggregate fn");
            Bookings.aggregate([                               
                {$match :{"hallId": hallId}},            
                {$match: 
                    {$or:
                        [
                            {$and:[
                                {"startDateTime":{$lte:startDate}},{"endDateTime": {$gte:startDate}}
                            ]},

                            {$and:[
                                {"startDateTime":{$lte:endDate}},{"endDateTime": {$gte:endDate}}
                            ]},

                            {"startDateTime" : {$gte:startDate, $lte : endDate}},
                            
                            {"endDateTime" : {$gte:startDate, $lte : endDate}}
                            // {$and:[
                            //     {$gt :["startDateTime", startDate]}, {$lt :["startDateTime", endDate]}
                            // ]},
                            // {$and:[
                                // {$gt :["endDateTime", startDate]}, {$lt :["endDateTime", endDate]}
                            // ]}
                        ]
                    }
                }


            ], (err:any, data: any)=>{
                if(err){
                    console.log("error in aggragations function")
                    reject(err);
                }
                if(data.length!==0){
                    console.log(data);
                    console.log("there is a conflict in dates");
                    reject("not available");
                } else{
                    let b = {
                        "hallId" : hallId,
                        "userId" : userId,
                        "startDateTime" : startDate,
                        "endDateTime" : endDate,
                        "status" : true
                    };
                    
                    let booking = new Booking(b);
                    console.log("booking initiated...");
                    Bookings.create(booking, (err:any, data:any)=>{
                        if (err) {
                            console.log("error in saving a booking?")
                            console.log(err);
                            reject(err);
                        }
                        console.log(data);
                        console.log("location, noofseats, and further adding bookings");
                        resolve(data._id);
                    });
                }               
            });

        });
    }



    public viewAllBookings(page, itemsPerPage): any{
        return new Promise((resolve, reject)=>{
            Bookings.find().count((err, totalItems) => {
                if(err){
                    reject(err);
                } else {
                    Bookings.aggregate(
                        [
                            {$skip: (page) * itemsPerPage },
                            {$limit: itemsPerPage }
                        ], function(err, data) {
                            if(err) {
                                reject(err);
                            }
                            else {
                                let jsonObj = 
                                {
                                    "paginationData": {
                                        "totalItems": totalItems,
                                        "currentPage": page+1,
                                        "itemsPerPage": itemsPerPage
                                    },
                                    "data":data
                                }
                                resolve(jsonObj);
                            }

                        }
                    )
                }
            });
        });
    }



    public cancel(bookingId: any){
        return new Promise((resolve, reject)=>{
            //findByIdAndRemove
            Bookings.findOne({'_id': bookingId}, (err:any, booking: any)=>{
                if (err) {
                    reject(err);
                } else {
                    let d = Date.now();
                    if (booking.startDateTime - d <= 0) reject("cannot cancel past or current booking.");  
                    else {

                        Bookings.deleteOne({'_id': bookingId}, (err:any)=>{
                            if (err) {
                                reject(err);
                            } else {
                                resolve(bookingId);
                            }
                        });

                    }               
                }
            });
        });
    }

    public viewUserBookings(userId: any){
        return new Promise((resolve, reject)=>{
            Bookings.find({ "userId": userId}, (err, data)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

    }
}