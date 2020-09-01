import express, { Application } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';

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
        origin: process.env.ALLOWED_ORIGINS,
        methods: process.env.ALLOWED_METHODS
    }));
};
