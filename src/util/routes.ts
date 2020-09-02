import express, { Request, Response, Router, Application } from 'express';
import { requestLogger, requestAuth, errorHandler } from './middleware';
import { EmployeeController } from '../controllers/employee-controller';
import { AccountController } from '../controllers/account-controller';

const accountRoutes = (): Router => {
    const router = express.Router();

    router.post('/login', AccountController.login);
    router.post('/logout', AccountController.logout);
    router.post('/authorized', AccountController.authorized);
    return router;
};

const employeeRoutes = (): Router => {
    const router = express.Router();

    router.get('/', EmployeeController.getEmployees);
    router.get('/status', EmployeeController.getEmployeesStatus);
    router.get('/search', EmployeeController.searchEmployees);
    router.get('/summary', EmployeeController.getSalarySummary);
    router.get('/:id', EmployeeController.getEmployee);
    router.post('/', EmployeeController.addEmployee);
    router.post('/many', EmployeeController.addManyEmployees);
    router.put('/:id', EmployeeController.updateEmployee);
    router.delete('/:id', EmployeeController.deleteEmployee);
    return router;
};

const missingRoutes = (app: Application) => {
    app.get('*', (req: Request, res: Response) => {
        res.status(404).json({
            error: "Not Found"
        });
    });
};

/**
 * Registers application routes
 */
export const registerRoutes = (app: Application) => {

    // request logger
    app.use(requestLogger);

    // authorize
    app.use(requestAuth);

    // register routes
    app.use('/api/accounts/', accountRoutes());
    app.use('/api/employees/', employeeRoutes());

    // missing routes
    missingRoutes(app);

    // error handler
    app.use(errorHandler);
};