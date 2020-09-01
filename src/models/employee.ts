export interface Employee {
    Id: number;
    Code: string;
    Name: string;
    Job: string;
    Salary: number;
    Department: string;
}

export interface Summary {
    Department: SummaryDetail;
    Job: SummaryDetail;
}

export interface SummaryDetail {
    Job: string;
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
