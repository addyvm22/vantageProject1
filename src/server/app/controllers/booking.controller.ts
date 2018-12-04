/****
 * 
 * @author: Adwait
 * 
 * */

import * as express from 'express';
import { IBooking, Booking, BookingDocument, Bookings } from '../../db/models/booking.model';
import Controller  from '../config/controller.config';
import { BookingService } from '../services/booking.service';
import { ErrorDTO } from '../DTO/ErrorDTO';
const BASE_URI = '/booking';

module BookingModule{
    export class BookingController {
        bookingService: BookingService;
        app: express.Application;
        admin: any;
        auth: any;
        router: express.Router;

        constructor(app: express.Application, router: express.Router, admin: any, auth: any) {
            this.bookingService = new BookingService();
            this.app = app;
            this.router = router;
            this.admin = admin;
            this.auth = auth;
            // Configure our router/controller;
            this.configureController();
        }

        private configureController(){


            this.router.post(`${BASE_URI}/book`, (req: express.Request,
            res: express.Response,
            next: express.NextFunction) => {
                console.log("start at the booking controller");

                try{                  
                    let startDate = new Date(+req.body.startDate);
                    let endDate = new Date(+req.body.endDate);

                    this.bookingService.book(req.body.hallId,req.body.userId, startDate, endDate)
                    .then((bookingId: any) => {
                        console.log(" .then in bookingservice executed");
                        res.status(200);
                        res.json({ status: 1, id: bookingId, message: 'hall booked' });
                    })
                    .catch((err: any) => {
                        console.log("the error is at .catch in the controller..")
                        console.log(err);
                        let error = new ErrorDTO(err, 1);
                        res.status(500).json(error);
                    });
                } catch(e) {                   
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                }
            });


            this.router.delete(`${BASE_URI}/cancel/:id`, this.auth, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                    try{                        
                        this.bookingService.cancel(req.params.id)
                        .then((bookingId: any) => {
                            res.status(200);
                            res.json({ status: 1, id: bookingId, message: 'booking cancelled' });
                         })
                        .catch((err: any) => {
                            let error = new ErrorDTO(err, 1);
                            res.status(500).json(error);
                        });
                    } catch(e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
                }
            );


            this.router.get(`${BASE_URI}/admin/viewall/:page`, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    let page = Number(req.params.page);
                    let itemsPerPage = 5;

                    this.bookingService.viewAllBookings(page, itemsPerPage)
                    .then((data: any) => {
                        res.status(200);
                        res.send(data);
                     })
                    .catch((err: any) => {
                        let error = new ErrorDTO(err, 1);
                        res.status(500).json(error);
                    });
                    
                } catch(e) {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                }                
            });


            this.router.get(`${BASE_URI}/user/bookings`, this.auth, (req: express.Request, 
                res: express.Response,
                next: express.NextFunction)=>{
                    try{
                        this.bookingService.viewUserBookings(req.body.userId)
                        .then((data:any) => {
                            res.status(200);
                            res.send(data);
                        })
                        .catch((err:any)=>{
                            let error = new ErrorDTO(err, 1);
                            res.status(500).json(error);
                        });

                    } catch(e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
                }
            
            );
        }
    }
}

export = BookingModule;