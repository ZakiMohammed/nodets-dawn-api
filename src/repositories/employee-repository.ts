import { DataAccess } from '../data/data-access';
import { Employee, Summary, SummaryDetail, Status } from '../models/employee';
import { Table, VarChar, Int } from 'mssql';

export class EmployeeRepository {
    static async getEmployees(): Promise<Employee[]> {
        try {
            const dataAccess = new DataAccess();
            const result = await dataAccess.queryEntity<Employee[], null>(
                `SELECT * FROM Employee;`, null);
            const employees = result.recordset as unknown as Employee[];

            return employees;

        } catch (error) {
            throw error;
        }
    }

    static async getEmployee(id: number): Promise<Employee | null> {
        try {
            const dataAccess = new DataAccess();
            const result = await dataAccess.query(
                `SELECT * FROM Employee WHERE Id = @Id;`, [
                { name: 'Id', value: id }
            ]);
            if (result.recordset.length) {
                return result.recordset[0] as unknown as Employee;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    static async getEmployeesStatus(): Promise<Status> {
        try {
            const dataAccess = new DataAccess();
            const result = await dataAccess.execute(`GetEmployeesStatus`, [], [
                { name: 'Count', value: 0 },
                { name: 'Max', value: 0 },
                { name: 'Min', value: 0 },
                { name: 'Average', value: 0 },
                { name: 'Sum', value: 0 },
            ]);
            const status = {
                Count: +result.output.Count,
                Max: +result.output.Max,
                Min: +result.output.Min,
                Average: +result.output.Average,
                Sum: +result.output.Sum
            } as Status;

            return status;

        } catch (error) {
            throw error;
        }
    }

    static async searchEmployees(name: string): Promise<Employee[]> {
        try {
            const dataAccess = new DataAccess();
            const result = await dataAccess.execute(`SearchEmployee`, [
                { name: 'Name', value: name }
            ]);
            const employees = result.recordset as unknown as Employee[];

            return employees;

        } catch (error) {
            throw error;
        }
    }

    static async getSalarySummary(): Promise<Summary> {
        try {
            const dataAccess = new DataAccess();
            const result = await dataAccess.execute(`GetSalarySummary`);
            const summary: Summary = {
                Department: result.recordsets[0] as unknown as SummaryDetail,
                Job: result.recordsets[1] as unknown as SummaryDetail,
            };

            return summary;

        } catch (error) {
            throw error;
        }
    }

    static async addEmployee(employee: Employee): Promise<Employee> {
        try {
            const dataAccess = new DataAccess();
            const result = await dataAccess.queryEntity<number, Employee>(`
                INSERT INTO Employee (Code, Salary, Job, Department, Name)
                OUTPUT inserted.Id
                VALUES (@Code, @Salary, @Job, @Department, @Name);`, employee);
            employee.Id = (result.recordset[0] as any).Id;
            return employee;

        } catch (error) {
            throw error;
        }
    }

    static async addManyEmployees(employees: Employee[]): Promise<Employee[]> {
        try {
            const dataAccess = new DataAccess();

            const pool = dataAccess.connectionPool;

            await pool.connect();

            const employeesTable = new Table();

            employeesTable.columns.add('Code', VarChar(50));
            employeesTable.columns.add('Name', VarChar(50));
            employeesTable.columns.add('Job', VarChar(50));
            employeesTable.columns.add('Salary', Int);
            employeesTable.columns.add('Department', VarChar(50));

            employees.forEach((employee) => {
                employeesTable.rows.add(
                    employee.Code,
                    employee.Name,
                    employee.Job,
                    employee.Salary,
                    employee.Department
                )
            });

            const request = pool.request();
            request.input('Employees', employeesTable);

            const result = await request.execute('AddEmployees');
            const newEmployees = result.recordset as Employee[];

            return newEmployees;
        } catch (error) {
            throw error;
        }
    }

    static async updateEmployee(id: number, employee: Employee): Promise<Employee> {
        try {
            employee.Id = id;

            const dataAccess = new DataAccess();
            await dataAccess.queryEntity<number, Employee>(`
                UPDATE Employee SET
                    Code = @Code,
                    Salary = @Salary,
                    Job = @Job,
                    Department = @Department,
                    Name = @Name
                WHERE Id = @Id;`, employee);
            return employee;

        } catch (error) {
            throw error;
        }
    }

    static async deleteEmployee(id: number): Promise<void> {
        try {
            const dataAccess = new DataAccess();
            await dataAccess.query(`
                DELETE FROM Employee WHERE Id = @Id`, [
                { name: 'Id', value: id }
            ]);
        } catch (error) {
            throw error;
        }
    }
}
