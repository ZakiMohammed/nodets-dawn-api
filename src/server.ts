import express, { Application } from 'express';
import { registerRoutes } from './util/routes';
import { configure } from './util/config';

const app: Application = express();

// configure application
configure(app);

// register application routes
registerRoutes(app);

app.listen(process.env.PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`Server started running on ${process.env.PORT} ${process.env.NODE_ENV}`);
});
