import * as express from 'express';
import { IUser, User, UserDocument, Users } from '../../db/models/user.model';
import Controller  from '../config/controller.config';
import { UserService } from '../services/user.service';
import { ErrorDTO } from '../DTO/ErrorDTO';
const BASE_URI = '/user';

module UserModule {
    export class UserController {
        userService: UserService;
        app: express.Application;
        admin: any;
        router: express.Router;
        constructor(app: express.Application, router: express.Router, admin: any) {
            this.userService = new UserService();
            this.app = app;
            this.router = router;
            this.admin = admin;
            // Configure our router/controller;
            this.configureController();
        }

        private configureController() {

            // Configure routes
            this.router.get(`${BASE_URI}/page/:page`, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    let page = { page: req.params.page };
                    let itemsPerPage = 5;
                    let currentPage = Number(page.page);
                    let pageNumber = currentPage - 1;
                    let skip = (itemsPerPage * pageNumber);
                    let limit = skip + itemsPerPage;
                    this.userService.userList( page, itemsPerPage, currentPage, pageNumber, skip, limit)
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
            //controller for saving new user details
            this.router.post(BASE_URI, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                console.log("userAA", req.body);
                try {
                    this.userService.saveUser(req.body)
                    .then((userId: any) => {
                            if(userId) {
                                res.status(200);
                                res.json({ status: 1, id: userId, message: 'user created' });
                            } else {
                                res.status(226);
                                res.json({ message: 'user with same username or email already exists', status: 2 });                       
                            }
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

            //controller for getting user details
            this.router.get(`${BASE_URI}/:user_id`, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    this.userService.getUser(req.params.user_id)
                    .then((user: any) => {
                        user? res.status(200): res.status(204);
                        res.json(user);
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

            //controller for deleting user details
            this.router.delete(`${BASE_URI}/:user_id`, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    let id = req.params.user_id;              
                    this.userService.deleteUser(id)
                    .then((userId: any) => {
                        if(userId) {
                            res.status(200);
                            res.json({ status: 1, id: userId, message: 'user deleted' });
                        } else {
                            res.status(200);
                            res.json({ status: 2, message: 'user does not exists' });
                        }
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

            //controller for updating user details
            this.router.put(`${BASE_URI}/:user_id`, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    this.userService.updateUser(req.params.user_id, req.body)
                    .then((userId: any) => {
                        res.status(200);
                        res.json({ status: 1, id: userId, message: 'user details updated' });
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

        }
    }
}

export = UserModule;