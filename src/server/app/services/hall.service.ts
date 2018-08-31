"use strict"

import * as express from 'express';
import {Hall, HallDocument, Halls} from '../../db/models/hall.model'

const BASE_URI = 'hall';

export class HallService{    
    constructor(){    
    }

    public saveHall(newHall: any): any{
        console.log(newHall);
        return new Promise( function(resolve, reject){
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
}