import express, { Application } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import { CacheAccess } from './cache-access';

/**
 * Configuration setup for application
 */
export const configure = (app: Application) => {

    dotenv.config();

    app.disable('x-powered-by');
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({
        origin: allowedOrigin,
        methods: process.env.ALLOWED_METHODS
    }));
    app.set(process.env.GLOBAL_CACHE as string, cache());
};

const allowedOrigin = (
    requestOrigin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
) => {
    if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
    } else {
        if (process.env.ALLOWED_ORIGINS?.includes(requestOrigin as string)) {
            return callback(null, true);
        } else {
            return callback(new Error(
                'The CORS policy for this site does not ' +
                'allow access from the specified Origin.'), false);
        }
    }
};

const cache = (): CacheAccess => {
    return new CacheAccess();
};
