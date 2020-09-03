import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user-repository';
import { AuthUser, Auth } from '../models/auth';
import jwt from "jsonwebtoken";
import { CacheAccess } from '../util/cache-access';

export class AccountController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userName = req.body.UserName as string;
            const password = req.body.Password as string;
            const user = await UserRepository.authenticate(userName, password);

            if (user) {
                const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
                const JWT_EXPIRES_IN = +(process.env.JWT_EXPIRES_IN as string);

                const authUser: AuthUser = {
                    id: user.Id,
                    userName: user.UserName
                };

                jwt.sign(authUser, JWT_SECRET_KEY, {
                    expiresIn: JWT_EXPIRES_IN
                }, (err, token) => {
                    // tslint:disable-next-line: no-console
                    console.log(token);
                    if (err) {
                        throw err;
                    } else {
                        res.json({ token, authUser } as Auth);
                    }
                });
            } else {
                res.status(401).json();
            }
        } catch (error) {
            next(error);
        }
    };

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const cache = req.app.settings[process.env.GLOBAL_CACHE as string] as CacheAccess;
            const options = {
                ttl: ((req.body.exp * 1000) - new Date().getTime()) / 1000
            };

            await cache.set(req.body.token, req.body.token, options);

            res.json();
        } catch (error) {
            next(error);
        }
    };

    static async authorized(req: Request, res: Response, next: NextFunction) {
        try {
            const authUser: AuthUser = res.locals.authUser;
            res.json(authUser);
        } catch (error) {
            next(error);
        }
    };
}
