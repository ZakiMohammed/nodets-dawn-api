import { DataAccess, Params } from '../data/data-access';
import { EmployeeRepository } from './employee-repository';
import * as MOCKS from '../mocks/employee';
import { Table } from 'mssql';

jest.mock('../data/data-access');
jest.mock('mssql');

describe('Employee Repository', () => {
    let mockDataAccess: jest.Mock;
    let mockTable: jest.Mock;
    let mockQueryEntity: any;
    let mockQuery: any;
    let mockExecute: any;

    beforeEach(() => {
        mockDataAccess = (DataAccess as unknown as jest.Mock);
        mockDataAccess.mockImplementation(() => ({
            connectionPool: {
                connect: jest.fn,
                request: () => ({
                    input: jest.fn,
                    output: jest.fn,
                    execute: (command: string) => mockExecute()
                })
            },
            query: <T>(command: string, inputs: Params[] = [], outputs: Params[] = []) => mockQuery(),
            queryEntity: <T, E>(command: string, entity: E, outputs: Params[] = []) => mockQueryEntity(),
            execute: <T>(procedure: string, inputs: Params[] = [], outputs: Params[] = []) => mockExecute(),
        }));

        mockTable = (Table as unknown as jest.Mock);
        mockTable.mockImplementation(() => ({
            columns: {
                add: jest.fn
            },
            rows: {
                add: jest.fn
            }
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GetEmployees', () => {
        it('should get employees', async () => {
            const result = {
                recordset: MOCKS.EMPLOYEES
            };

            mockQueryEntity = () => (Promise.resolve(result));

            const employees = await EmployeeRepository.getEmployees();
            expect(employees).toStrictEqual(MOCKS.EMPLOYEES);
        });

        it('should not get employees if error occurred', async () => {
            mockQueryEntity = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.getEmployees().catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe('GetEmployee', () => {
        it('should get employee', async () => {
            const result = {
                recordset: [
                    MOCKS.EMPLOYEE
                ]
            };

            mockQuery = () => (Promise.resolve(result));

            const employee = await EmployeeRepository.getEmployee(1);
            expect(employee).toStrictEqual(MOCKS.EMPLOYEE);
        });

        it('should not get employee if not found', async () => {
            const result = {
                recordset: []
            };

            mockQuery = () => (Promise.resolve(result));

            const employee = await EmployeeRepository.getEmployee(1);
            expect(employee).toStrictEqual(null);
        });

        it('should not get employee if error occurred', async () => {
            mockQuery = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.getEmployee(1).catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe('GetEmployeesStatus', () => {
        it('should get employee status', async () => {
            const result = {
                output: MOCKS.STATUS
            };

            mockExecute = () => (Promise.resolve(result));

            const status = await EmployeeRepository.getEmployeesStatus();
            expect(status).toStrictEqual(MOCKS.STATUS);
        });

        it('should not get employee status if error occurred', async () => {
            mockExecute = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.getEmployeesStatus().catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe('SearchEmployees', () => {
        it('should search employees', async () => {
            const result = {
                recordset: MOCKS.EMPLOYEES
            };

            mockExecute = () => (Promise.resolve(result));

            const employees = await EmployeeRepository.searchEmployees('j');
            expect(employees).toStrictEqual(MOCKS.EMPLOYEES);
        });

        it('should not search employees if error occurred', async () => {
            mockExecute = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.searchEmployees('j').catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe('GetSalarySummary', () => {
        it('should get salary summary', async () => {
            const result = {
                recordsets: [
                    MOCKS.SUMMARY.Department,
                    MOCKS.SUMMARY.Job,
                ]
            };

            mockExecute = () => (Promise.resolve(result));

            const summary = await EmployeeRepository.getSalarySummary();
            expect(summary).toStrictEqual(MOCKS.SUMMARY);
        });

        it('should not get salary summary if error occurred', async () => {
            mockExecute = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.getSalarySummary().catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe('AddEmployee', () => {
        it('should add employee', async () => {
            const result = {
                recordset: [
                    MOCKS.EMPLOYEE
                ]
            };

            mockQueryEntity = () => (Promise.resolve(result));

            const employee = await EmployeeRepository.addEmployee(MOCKS.EMPLOYEE);
            expect(employee).toStrictEqual(MOCKS.EMPLOYEE);
        });

        it('should not add employee if error occurred', async () => {
            mockQueryEntity = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.addEmployee(MOCKS.EMPLOYEE).catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe('AddManyEmployee', () => {
        it('should add many employee', async () => {
            const result = {
                recordset: MOCKS.EMPLOYEES
            };

            mockExecute = () => (Promise.resolve(result));

            const employees = await EmployeeRepository.addManyEmployees(MOCKS.EMPLOYEES);
            expect(employees).toStrictEqual(MOCKS.EMPLOYEES);
        });

        it('should not add many employee if error occurred', async () => {
            mockExecute = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.addManyEmployees(MOCKS.EMPLOYEES).catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe('UpdateEmployee', () => {
        it('should update employee', async () => {
            const result = {};

            mockQueryEntity = () => (Promise.resolve(result));

            const employee = await EmployeeRepository.updateEmployee(1, MOCKS.EMPLOYEE);
            expect(employee).toStrictEqual(MOCKS.EMPLOYEE);
        });

        it('should not update employee if error occurred', async () => {
            mockQueryEntity = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.updateEmployee(1, MOCKS.EMPLOYEE).catch(error => {
                expect(error).toBeDefined();
            });
        });
    });

    describe('DeleteEmployee', () => {
        it('should delete employee', async () => {
            mockQuery = jest.fn();

            await EmployeeRepository.deleteEmployee(1);

            expect(mockQuery).toHaveBeenCalled();
        });

        it('should not update employee if error occurred', async () => {
            mockQuery = () => (Promise.reject(new Error('Error occurred')));

            await EmployeeRepository.deleteEmployee(1).catch(error => {
                expect(error).toBeDefined();
            });
        });
    });
});
