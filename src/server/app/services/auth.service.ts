import * as express from 'express';
import * as passport from 'passport';
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import { TokenService } from './token.service';
import { UserResponseDTO } from '../DTO/UserResponseDTO';
// Load the Mongoose ObjectId function to cast string as
// ObjectId
let ObjectId = require('mongoose').Types.ObjectId;

const BASE_URI = '/auth';

export class AuthService {

    passport: any;
    auth: any;
    admin: any;
    tokenService: TokenService;

    constructor(passport: any,
        auth: any,
        admin: any,
        tokenService: TokenService) {
        this.passport = passport;
        this.auth = auth;
        this.admin = admin;
        this.tokenService = tokenService;
    }

    public delete(uid: any) {
        return new Promise((resolve, reject) => {
            Users.remove({
                // Model.find `$or` Mongoose condition
                $or: [
                    { 'username': uid },
                    { 'email': uid },
                    { '_id': ObjectId(uid) }
                ]
            }, (err: any) => {
                // If there are any errors, return them
                if (err)
                    console.log(err);
                    reject(err);
                resolve(uid);
            });
        });
    }


    public login(req: express.Request,
        res: express.Response,
        next: express.NextFunction) {
        // Call `authenticate()` from within the route handler, rather than
        // as a route middleware. This gives the callback access to the `req`
        // and `res` object through closure.
        // If authentication fails, `user` will be set to `false`. If an
        // exception occured, `err` will be set. `info` contains a message
        // set within the Local Passport strategy.
        passport.authenticate('local-login', { session: true }, (err: any, user: User, info: any) => {
            if (err)
                return next(err);
            // If no user is returned...
            if (!user) {
                // Set HTTP status code `401 Unauthorized`
                res.status(401);
                // Return the info message
                return next(info.message);
            }
            // Use login function exposed by Passport to establish a login
            // session
            req.login(user, (err: any) => {
                if (err)
                    return next(err);
                // Issue a remember me cookie if the option was checked
                if (req.body.rememberMe) {

                    this.tokenService.generateAndSaveToken(user, (err, token) => {
                        console.log(token);
                        if (err) { return next(err); }
                        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
                        res.status(200);
                        let responseUser = new UserResponseDTO(user, req.body.rememberMe);
                        // Return the user object
                        res.json(responseUser);
                    });
                } else {
                    // Set HTTP status code `200 OK`                
                    res.status(200);
                    //res.cookie('remember_me', token, { path: '/', httpOnly: true});
                    let responseUser = new UserResponseDTO(user, req.body.rememberMe);
                    // Return the user object
                    res.json(responseUser);
                }
            });
        })(req, res, next);
    }


    public register(req: express.Request,
        res: express.Response,
        next: express.NextFunction) {
        // Call `authenticate()` from within the route handler, rather than
        // as a route middleware. This gives the callback access to the `req`
        // and `res` object through closure.
        // If authentication fails, `user` will be set to `false`. If an
        // exception occured, `err` will be set. `info` contains a message
        // set within the Local Passport strategy.


        passport.authenticate('local-signup', (err: any, user: User, info: any) => {
            if (err)
                return next(err);
            // If no user is returned...
            if (!user) {
                // Set HTTP status code `409 Conflict`
                res.status(409);
                // Return the info message
                return next(info.message);
            }            
            let responseUser = new UserResponseDTO(user, req.body.rememberMe);
            // Set HTTP status code `200 OK`
            res.status(200);
            res.json(responseUser);
        })(req, res, next);
    }
}

