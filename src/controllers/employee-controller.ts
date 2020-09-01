import { Request, Response, NextFunction } from 'express';
import { EmployeeRepository } from '../repositories/employee-repository';
import { Employee } from '../models/employee';

export class EmployeeController {
    static async getEmployees(req: Request, res: Response, next: NextFunction) {
        try {
            const employees = await EmployeeRepository.getEmployees();
            res.json(employees);
        } catch (error) {
            next(error);
        }
    };

    static async getEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const employee = await EmployeeRepository.getEmployee(+req.params.id);
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({
                    message: 'Record not found'
                });
            }
        } catch (error) {
            next(error);
        }
    };

    static async getEmployeesStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const status = await EmployeeRepository.getEmployeesStatus();
            res.json(status);
        } catch (error) {
            next(error);
        }
    };

    static async searchEmployees(req: Request, res: Response, next: NextFunction) {
        try {
            const employees = await EmployeeRepository.searchEmployees(req.query.name as string);
            res.json(employees);
        } catch (error) {
            next(error);
        }
    };

    static async getSalarySummary(req: Request, res: Response, next: NextFunction) {
        try {
            const summary = await EmployeeRepository.getSalarySummary();
            res.json(summary);
        } catch (error) {
            next(error);
        }
    };

    static async addEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const employee = await EmployeeRepository.addEmployee(req.body as Employee);
            res.json(employee);
        } catch (error) {
            next(error);
        }
    };

    static async addManyEmployees(req: Request, res: Response, next: NextFunction) {
        try {
            const employees = await EmployeeRepository.addManyEmployees(req.body as Employee[]);
            res.json(employees);
        } catch (error) {
            next(error);
        }
    };

    static async updateEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const employee = await EmployeeRepository.updateEmployee(+req.params.id, req.body as Employee);
            res.json(employee);
        } catch (error) {
            next(error);
        }
    };

    static async deleteEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const employee = await EmployeeRepository.deleteEmployee(+req.params.id);
            res.json(employee);
        } catch (error) {
            next(error);
        }
    };
}
