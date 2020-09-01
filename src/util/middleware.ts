import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import logger from "./logger";

/**
 * Request authorizer. Authorize incoming request
 */
export const requestAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    } catch (err) {
        logger.error(err.message, {
            route: req.path,
            stack: err.stack,
            "request-id": res.locals.requestId
        });
        res.status(401).send();
    }
};

/**
 * Manipulate Json. Manipulate json response. Add it to middleware chain if
 * response needed to be manipulated before sending
 */
export const manipulateJson = (req: Request, res: Response, next: NextFunction) => {

    // intercept json
    const oldJson = res.json;
    res.json = (data: any) => {;

        // set function back to avoid the 'double-send'
        res.json = oldJson;

        // check for your condition
        if (res.locals.condition) {
            // manipulate response
            return res.json({
                data1: res.locals.data1,
                data2: res.locals.data2,
                data
            });
        }
        return res.json(data);
    };
    next();
};

/**
 * Request logging handler. Logs route, status code and x-request-id if externally set
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {

    // setup request ID for request correlation
    res.locals.requestId = v4();

    // adding requestId in response header
    res.header('x-request-id', res.locals.requestId);

    // intercept Request End
    const oldEnd = res.end;
    res.end = (...restArgs: any) => {
        logger.info({
            route: req.path,
            status: res.statusCode,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            "request-id": res.locals.requestId
        });

        oldEnd.apply(res, restArgs);
    };

    next();
};

/**
 * Error Handler. Provides full stack
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    logger.error(err.message, {
        route: req.path,
        stack: err.stack,
        "request-id": res.locals.requestId
    });

    res.status(500).json(process.env.NODE_ENV === "development" ? { error: err.message } : {});

    next();
};
