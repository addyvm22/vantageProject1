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
        router: express.Router;
        constructor(app: express.Application, router: express.Router, admin: any) {
            this.hallService = new HallService();
            this.app = app;
            this.router = router;
            this.admin = admin;
            // Configure our router/controller;
            this.configureController();
        }

        private configureController(){
            
        }
    }
}


