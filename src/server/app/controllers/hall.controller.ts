/****
 * 
 * @author: Adwait
 * 
 * */
import * as express from 'express';
import {IHall, Hall, HallDocument, Halls} from '../../db/models/hall.model';
import Controller from '../config/controller.config';
import { HallService } from '../services/hall.service';
import { ErrorDTO } from '../DTO/ErrorDTO';
const BASE_URI = '/hall';

module HallModule {
    export class HallController {
        hallService : HallService;
        app: express.Application;
        admin: any;
        auth: any;
        router: express.Router;
        constructor(app: express.Application, router: express.Router, admin: any, auth: any) {
            this.hallService = new HallService();
            this.app = app;
            this.router = router;
            this.admin = admin;
            this.auth = auth;
            // Configure our router/controller;
            this.configureController();
        }

        private configureController(){
            
            //post request sent by admin, to save a new hall
            //base url is /hall/add
            //
            this.router.post(`${BASE_URI}/add`,(req: express.Request, 
                res: express.Response, 
                next: express.NextFunction) => {
                    console.log("hall: ", req.body);
                    console.log('user', req.user);
                    try{
                        console.log(`into the try block in the controller..`);
                        
                        this.hallService.saveHall(req.body)
                        .then((hallId:any) => {
                            if(hallId) {
                                res.status(200);
                                res.json({status: 1, id: hallId, message: 'hall created'});
                            } else{
                                res.status(226);
                                res.json({message: 'hall with same name and location already exists', status: 2});
                            }
                        })
                        .catch((err:any)=>{
                            let error = new ErrorDTO(err, 1);
                            res.status(500).json(error);
                        });
                    }
                    catch(e){
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
                }
            );

            //rate any hall
            //hall.rating is a number[5] users will rate 12.. or 5 stars 
            //and each time the array will be incremented by one 
            this.router.post(`${BASE_URI}/rate`, (req: express.Request, 
                res: express.Response, 
                next: express.NextFunction)=>{
                    try{
                        this.hallService.rateHall(req.body.hallId,req.body.rating)
                        .then(function(hallId:any){
                            res.status(200);
                            res.json({status:1, id:hallId, message:"hall rated"});
                        })
                        .catch(function(err:any){
                            console.log(".catch activated")
                            let error = new ErrorDTO(err, 1);
                            res.status(500).json(error);
                        })
                    }
                    catch(e){
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
                }
            );

            this.router.post(`${BASE_URI}/search`, this.auth, function(req: express.Request, 
                res: express.Response, 
                next: express.NextFunction){
                    try{                       
                        let startDate = new Date(req.body.startDate);
                        let endDate = new Date(req.body.endDate);
                        this.hallService.searchHalls(req.body.location, req.body.seatsUpper,req.body.seatsLower,startDate, endDate)
                        .then(function(data:any){
                            res.status(200);
                            res.json({status:1,message:"halls sent"});
                        })
                        .catch(function(err:any){
                            let error = new ErrorDTO(err, 1);
                            res.status(500).json(error);
                        })
                    }
                    catch(e){
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
                }
            );



            


        }
    }

}


export = HallModule;

