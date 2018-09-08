"use strict"

import * as express from 'express';
import {Hall, HallDocument, Halls} from '../../db/models/hall.model'

const BASE_URI = 'hall';

export class HallService{    
    constructor(){    
    }

    public saveHall(newHall: any): any{
        return new Promise( function(resolve, reject){

            console.log(`starting to use the service: ${newHall}`);
            
            Halls.findOne(
                {$and: [{'name': newHall.name },
                {'location': newHall.location}
                ]},
                (err: any, hall:any) => {
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    if(hall) {
                        resolve(null);
                    }
                    else{
                        console.log("creating new hall....");
                        let hall = new Hall(newHall);
                        Halls.create(hall, function(err:any, data:any){
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            console.log(data);
                            resolve(data._id);
                        });
                    }
                }
            );
        });
    }

    public rateHall(hallId:any, rating: number){
        return new Promise(function(resolve, reject){
            if (+rating < 1 || +rating > 5 || (+rating)%1 !== 0) {
                console.log("rating<0 or >5");
                reject("rating should be from 1 to 5 and integer");
            }
            else{
                Halls.findOne({'_id': hallId },function(err:any, hall:any){
                    if(err){
                        console.log("hall not found");
                        reject("hall not found");
                    } else{
                        // console.log(hall);
                        // console.log(hall.ratings);
                        console.log("asldhlsadhlfkjashdflkhsldkfhlksadflksjahflkjshadlkfhlkasjdhflkjahsdfkhaskdflaskaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        
                        hall.ratings.set(rating-1, hall.ratings[rating-1]+1);
                        // console.log(hall.ratings);
                        //console.log(hall);
                        hall.save(function(err){
                            if(err){
                                console.log(err);
                                reject(err);
                            } else{
                                console.log(`rating has been added for hall name:${hall.name}, with id: ${hallId}`);
                                resolve(hallId);
                            }
                        });
                    }
                });
            }

            
        });
    }


    //search halls
    //@ params: location, no_of_seats upper_limit and lower_limit, startDate and endDate.
    //query the database for location, noOfSeats, and further, 
    //for the availability of the halls, algorithm:
    public searchHalls1(location: string, seatsUpper: number, seatsLower:number, startDate: Date, endDate: Date){
        return new Promise(function(resolve, reject){
            var finalData;
            if(location && seatsUpper && seatsLower){
                Halls.find({$and: [{'location': location},{'no_of_seats': {$lte:seatsUpper}}, 
                    {'no_of_seats': {$gte :seatsLower}}]}, function(err:any,data:any){
                        if (err) reject("No hall found");
                        finalData = data;
                });
            } else if(seatsUpper && seatsLower){
                Halls.find({$and: [{'no_of_seats': {$lte:seatsUpper}}, {
                    'no_of_seats': {$gte :seatsLower}}]} , function(err:any, data:any){
                        if (err) reject("No hall found");
                        finalData = data;
                });
            } else if (location){
                Halls.find({'location':location}, function(err:any, data: any){
                    if (err) reject("No hall found");
                    finalData = data;

                });
            } else{
                Halls.find({},(err:any, data:any)=>{
                    if (err) reject("No hall found");
                    finalData = data;
                });
            }

            if(startDate && endDate){
                for(let hall of finalData){
                    hall.toShow = available(hall, startDate, endDate);
                }
            }

            resolve(finalData);

            function available(hall:any, startDate: any, endDate: any){
                var dates = hall.bookingDates.splice(0);
                if(dates.indexOf(startDate)!==-1) return false;
                dates.push(startDate);
                dates.sort((d1,d2)=>d1-d2);
                let ind = dates.indexOf(startDate);
                if(ind %2==1) return false;
                if(ind==(dates.length-1)) return true;
                return ( endDate < dates[ind+1]);
            }
        });
    }

    public searchHalls(location: string, seatsUpper: number, seatsLower:number, startDate: Date, endDate: Date){
        return new Promise((resolve, reject)=>{            

            Halls.aggregate([
                
                {$match:
                    {$and:[{"location": location},{"no_of_seats":{ $gte : seatsLower}},{ "no_of_seats":{ $lte : seatsUpper}}]}
                },

                {$lookup:
                    {
                        from: "bookings",
                        localfield: "_id",
                        foreignfield: "hallId",
                        as:"hall_bookings"
                    }
                },
                
                {
                    $project: {
                       hall_bookings: {
                          $filter: {
                                input: "$hall_bookings",
                                as: "booking",
                                cond: 
                                    { $or:                                  
                                        [
                                            {$and:[
                                                {$lt:["$$booking.startDateTime", startDate]}, {$gt:["booking.endDateTime", startDate]}
                                            ]},
                                            {$and:[
                                                {$lt:["$$booking.startDateTime", endDate]}, {$gt:["booking.endDateTime", endDate]}
                                            ]},
                                            {$and:[
                                                {$gt:["$$booking.startDateTime", startDate]}, {$lt:["booking.startDateTime", endDate]}
                                            ]},
                                            {$and:[
                                                {$gt:["$$booking.endDateTime", startDate]}, {$lt:["booking.endDateTime", endDate]}
                                            ]}
                                        ]
                                    
                                    }  
                                                            
                                
                            }                        
                        
                        }
                    }
                },

                {$match :{"hall_bookings": []}}

            ], (err:any, data: any) => {

                console.log("location, noOfZeats, and further adding bookings");
                resolve(data);

            });
            
        });
            
    }


}