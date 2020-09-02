import { Employee, Status, Summary } from '../models/employee';

export const EMPLOYEES: Employee[] = [
    {
        "Id": 1,
        "Code": "CT7207",
        "Name": "Bently Smith",
        "Job": "Manager",
        "Salary": 40000,
        "Department": "Operations"
    },
    {
        "Id": 2,
        "Code": "CT7210",
        "Name": "Isla Morris",
        "Job": "Director",
        "Salary": 80000,
        "Department": "Operations"
    },
    {
        "Id": 3,
        "Code": "CT7202",
        "Name": "Allen Green",
        "Job": "Salesman",
        "Salary": 15000,
        "Department": "Sales"
    }
];

export const EMPLOYEE: Employee = {
    "Id": 1,
    "Code": "CT7207",
    "Name": "Bently Smith",
    "Job": "Manager",
    "Salary": 40000,
    "Department": "Operations"
};

export const STATUS: Status = {
    "Count": 23,
    "Max": 80000,
    "Min": 15000,
    "Average": 28260,
    "Sum": 650000
};

export const SUMMARY: Summary = {
    "Department": [
        {
            "Department": "Operations",
            "EmployeeCount": 10,
            "Salary": 360000,
            "Annual": 4320000
        },
        {
            "Department": "Sales",
            "EmployeeCount": 8,
            "Salary": 130000,
            "Annual": 1560000
        },
        {
            "Department": "Research",
            "EmployeeCount": 2,
            "Salary": 100000,
            "Annual": 1200000
        },
        {
            "Department": "Accounting",
            "EmployeeCount": 3,
            "Salary": 60000,
            "Annual": 720000
        }
    ],
    "Job": [
        {
            "Job": "Manager",
            "EmployeeCount": 9,
            "Salary": 280000,
            "Annual": 3360000
        },
        {
            "Job": "Salesman",
            "EmployeeCount": 8,
            "Salary": 130000,
            "Annual": 1560000
        },
        {
            "Job": "Analyst",
            "EmployeeCount": 2,
            "Salary": 100000,
            "Annual": 1200000
        },
        {
            "Job": "Director",
            "EmployeeCount": 1,
            "Salary": 80000,
            "Annual": 960000
        },
        {
            "Job": "Clerk",
            "EmployeeCount": 3,
            "Salary": 60000,
            "Annual": 720000
        }
    ]
};
