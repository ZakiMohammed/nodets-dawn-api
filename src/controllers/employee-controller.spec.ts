import { EmployeeController } from './employee-controller';
import { EmployeeRepository } from '../repositories/employee-repository';
import { Employee, Status, Summary } from '../models/employee';
import * as MOCKS from '../mocks/employee';

describe('Employee Controller', () => {
    let spyEmployee: SpyEmployee;
    let request: any;
    let response: any;
    let next: any;

    beforeEach(() => {
        spyEmployee = {
            getEmployees: jest.spyOn(EmployeeRepository, 'getEmployees'),
            getEmployee: jest.spyOn(EmployeeRepository, 'getEmployee'),
            getEmployeesStatus: jest.spyOn(EmployeeRepository, 'getEmployeesStatus'),
            searchEmployees: jest.spyOn(EmployeeRepository, 'searchEmployees'),
            getSalarySummary: jest.spyOn(EmployeeRepository, 'getSalarySummary'),
            addEmployee: jest.spyOn(EmployeeRepository, 'addEmployee'),
            addManyEmployees: jest.spyOn(EmployeeRepository, 'addManyEmployees'),
            updateEmployee: jest.spyOn(EmployeeRepository, 'updateEmployee'),
            deleteEmployee: jest.spyOn(EmployeeRepository, 'deleteEmployee'),
        };

        request = {};
        response = {
            status: () => {
                return {
                    send: jest.fn(),
                    json: jest.fn()
                }
            },
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GetEmployees', () => {
        it('should get employees', async () => {
            const result: Employee[] = MOCKS.EMPLOYEES;

            spyEmployee.getEmployees.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.getEmployees(request, response, next);

            expect(spyEmployee.getEmployees).toHaveBeenCalledTimes(1);
            spyEmployee.getEmployees.mock.results[0].value.then((mockResult: Employee[]) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not get employees if error occurred', async () => {
            spyEmployee.getEmployees.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.getEmployees(request, response, next);

            expect(spyEmployee.getEmployees).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('GetEmployee', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: 1
                }
            };
        });

        it('should get employee', async () => {
            const result: Employee = MOCKS.EMPLOYEE;

            spyEmployee.getEmployee.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.getEmployee(request, response, next);

            expect(spyEmployee.getEmployee).toHaveBeenCalledTimes(1);
            spyEmployee.getEmployee.mock.results[0].value.then((mockResult: Employee) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not get employee if not found', async () => {
            const result: Employee | null = null;

            spyEmployee.getEmployee.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.getEmployee(request, response, next);

            expect(spyEmployee.getEmployee).toHaveBeenCalledTimes(1);
            spyEmployee.getEmployee.mock.results[0].value.then((mockResult: Employee) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not get employee if error occurred', async () => {
            spyEmployee.getEmployee.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.getEmployee(request, response, next);

            expect(spyEmployee.getEmployee).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('GetEmployeesStatus', () => {
        it('should get employee status', async () => {
            const result: Status = MOCKS.STATUS;

            spyEmployee.getEmployeesStatus.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.getEmployeesStatus(request, response, next);

            expect(spyEmployee.getEmployeesStatus).toHaveBeenCalledTimes(1);
            spyEmployee.getEmployeesStatus.mock.results[0].value.then((mockResult: Status) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not get employee status if error occurred', async () => {
            spyEmployee.getEmployeesStatus.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.getEmployeesStatus(request, response, next);

            expect(spyEmployee.getEmployeesStatus).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('SearchEmployees', () => {
        beforeEach(() => {
            request = {
                query: {
                    name: 'j'
                }
            };
        });

        it('should search employee status', async () => {
            const result: Employee[] = MOCKS.EMPLOYEES;

            spyEmployee.searchEmployees.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.searchEmployees(request, response, next);

            expect(spyEmployee.searchEmployees).toHaveBeenCalledTimes(1);
            spyEmployee.searchEmployees.mock.results[0].value.then((mockResult: Status) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not get employee status if error occurred', async () => {
            spyEmployee.searchEmployees.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.searchEmployees(request, response, next);

            expect(spyEmployee.searchEmployees).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('GetSalarySummary', () => {
        it('should search salary status', async () => {
            const result: Summary = MOCKS.SUMMARY;

            spyEmployee.getSalarySummary.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.getSalarySummary(request, response, next);

            expect(spyEmployee.getSalarySummary).toHaveBeenCalledTimes(1);
            spyEmployee.getSalarySummary.mock.results[0].value.then((mockResult: Summary) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not get salary status if error occurred', async () => {
            spyEmployee.getSalarySummary.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.getSalarySummary(request, response, next);

            expect(spyEmployee.getSalarySummary).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('AddEmployee', () => {
        it('should add employee', async () => {
            const employee: Employee = MOCKS.EMPLOYEE;
            const result: Employee = { ...employee };

            request = {
                body: employee
            };

            spyEmployee.addEmployee.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.addEmployee(request, response, next);

            expect(spyEmployee.addEmployee).toHaveBeenCalledTimes(1);
            spyEmployee.addEmployee.mock.results[0].value.then((mockResult: Employee) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not add employee if error occurred', async () => {
            spyEmployee.addEmployee.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.addEmployee(request, response, next);

            expect(spyEmployee.addEmployee).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('AddManyEmployees', () => {
        it('should add many employees', async () => {
            const employees: Employee[] = MOCKS.EMPLOYEES;
            const result: Employee[] = [...employees];

            request = {
                body: employees
            };

            spyEmployee.addManyEmployees.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.addManyEmployees(request, response, next);

            expect(spyEmployee.addManyEmployees).toHaveBeenCalledTimes(1);
            spyEmployee.addManyEmployees.mock.results[0].value.then((mockResult: Employee[]) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not add many employee if error occurred', async () => {
            spyEmployee.addManyEmployees.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.addManyEmployees(request, response, next);

            expect(spyEmployee.addManyEmployees).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('UpdateEmployee', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: 1
                }
            };
        });

        it('should update employee', async () => {
            const employee: Employee = MOCKS.EMPLOYEE;
            const result: Employee = { ...employee };

            request.body = employee;

            spyEmployee.updateEmployee.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.updateEmployee(request, response, next);

            expect(spyEmployee.updateEmployee).toHaveBeenCalledTimes(1);
            spyEmployee.updateEmployee.mock.results[0].value.then((mockResult: Employee) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not update employee if error occurred', async () => {
            spyEmployee.updateEmployee.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.updateEmployee(request, response, next);

            expect(spyEmployee.updateEmployee).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('DeleteEmployee', () => {
        beforeEach(() => {
            request = {
                params: {
                    id: 1
                }
            };
        });

        it('should delete employee', async () => {
            const result = {};

            spyEmployee.deleteEmployee.mockImplementation(() => Promise.resolve(result));

            await EmployeeController.deleteEmployee(request, response, next);

            expect(spyEmployee.deleteEmployee).toHaveBeenCalledTimes(1);
            spyEmployee.deleteEmployee.mock.results[0].value.then((mockResult: Employee) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not delete employee if error occurred', async () => {
            spyEmployee.deleteEmployee.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await EmployeeController.deleteEmployee(request, response, next);

            expect(spyEmployee.deleteEmployee).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});

interface SpyEmployee {
    getEmployees: jest.SpyInstance;
    getEmployee: jest.SpyInstance;
    getEmployeesStatus: jest.SpyInstance;
    searchEmployees: jest.SpyInstance;
    getSalarySummary: jest.SpyInstance;
    addEmployee: jest.SpyInstance;
    addManyEmployees: jest.SpyInstance;
    updateEmployee: jest.SpyInstance;
    deleteEmployee: jest.SpyInstance;
}
