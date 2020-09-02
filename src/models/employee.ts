export interface Employee {
    Id: number;
    Code: string;
    Name: string;
    Job: string;
    Salary: number;
    Department: string;
}

export interface Summary {
    Department: SummaryDepartment[];
    Job: SummaryJob[];
}

export interface SummaryJob {
    Job: string;
    EmployeeCount: number;
    Salary: number;
    Annual: number;
}

export interface SummaryDepartment {
    Department: string;
    EmployeeCount: number;
    Salary: number;
    Annual: number;
}

export interface Status {
    Count: number;
    Max: number;
    Min: number;
    Average: number;
    Sum: number;
}
