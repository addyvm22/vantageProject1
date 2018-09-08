'use strict';
import * as express from 'express';
// Load `User` `interfaces`, `class`, and `model`
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import { AuthService } from '../services/auth.service';
import { ErrorDTO } from '../DTO/ErrorDTO';
const BASE_URI = '/auth';
module Authentication {
    export class AuthController {
        app: express.Application;
        router: express.Router;
        authService: AuthService;
        auth: any;
        admin: any;
        constructor(app: express.Application,
            router: express.Router,
            passport: any,
            auth: any,
            admin: any,
            tokenService: any) {
            this.app = app;
            this.router = router;
            this.auth = auth;
            this.admin = admin;
            //instantiate the AuthService to use inside controllers
            this.authService = new AuthService(passport, auth, admin, tokenService);
            //register the controllers/routes
            this.configureRoutes();


        }
        private configureRoutes() {
            // Configure routes
            this.router.route(`${BASE_URI}/authenticate`)
                .get((req: express.Request,
                    res: express.Response,
                    next: express.NextFunction) => {
                        console.log(req.user);
                    res.send(req.isAuthenticated() ? req.user : '0');
                });

            //this.router.delete('url', fn1, fn2) fn1 and fn2 get parameters as (req,res,next) 
            //if we visit this route, fn1 gets called first and then if it does not generate an error, 
            // express.nextFunction is called with the same parameters.
            this.router
                .delete(`${BASE_URI}/delete/:uid`, this.admin, (req: express.Request,
                    res: express.Response) => {
                    try {

                        this.authService.delete(req.params.uid)
                            .then((uid: any) => {
                                res.status(200).json({ userId: uid, message: 'User Deleted' });
                            })
                            .catch((err: any) => {
                                let error = new ErrorDTO(err, 1);
                                res.status(500).json(error);
                            });
                    } catch (e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
                });
            this.router.route(`${BASE_URI}/login`)
                .post((req, res, next) => {
                    try {
                        this.authService.login(req, res, next);
                    } catch (e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
                });
            this.router.route(`${BASE_URI}/logout`)
                .post((req, res, next) => {
                    res.clearCookie('remember_me');
                    req.session.destroy(function(err) {
                        // Even though the logout was successful, send the status code
                        // `401` to be intercepted and reroute the user to the appropriate
                        // page
                        res.redirect('/');
                    });
                });
            this.router.route(`${BASE_URI}/register`)
                .post((req, res, next) => {
                    this.authService.register(req, res, next);
                });
            this.router
                .get(`${BASE_URI}/session`, this.auth, (req: express.Request,
                    res: express.Response) => {
                    try {
                        res.status(200).json(req.user)
                    } catch(e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);  
                    }
                });

        }
    }
}
export = Authentication;