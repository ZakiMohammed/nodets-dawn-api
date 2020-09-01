import { ConnectionPool, TYPES, config } from 'mssql';
import { DataAccess, Params } from './data-access';

jest.mock('mssql');

describe('Data Access', () => {

    let dataAccess: DataAccess;
    let mockPool: jest.Mock;

    let mockData: MockData[] = [];
    let mockExecute: any;
    let mockQuery: any;

    beforeEach(() => {
        mockPool = (ConnectionPool as unknown as jest.Mock);
        mockPool.mockImplementation(() => ({
            connect: jest.fn,
            request: () => ({
                input: jest.fn,
                output: jest.fn,
                execute: (command: string) => mockExecute(),
                query: (command: string) => mockQuery()
            })
        }));

        mockData = [
            { id: 1, value: 'Value 1' },
            { id: 2, value: 'Value 2' },
            { id: 3, value: 'Value 3' },
        ];

        dataAccess = new DataAccess();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('DataAccess Constructor', () => {
        it('should create Connection Pool constructor', () => {
            expect(dataAccess).toBeDefined();
        });

        it('should create Connection Pool constructor with config', () => {
            const dbConfig: config = {
                driver: 'SQL_DRIVER',
                server: 'SQL_SERVER',
                database: 'SQL_DATABASE',
                user: 'SQL_UID',
                password: 'SQL_PWD',
                options: {
                    encrypt: false,
                    enableArithAbort: false
                }
            };

            dataAccess = new DataAccess(dbConfig);
            expect(dataAccess).toBeDefined();
        });
    });

    describe('Connection Pool Getter', () => {
        it('should return connection pool instance', () => {
            const pool = dataAccess.connectionPool;
            expect(pool).toBeDefined();
        });
    });

    describe('Query Method', () => {
        it('should return IResult of supplied type', async () => {

            const mockResult = {
                recordsets: [mockData],
                recordset: mockData,
                rowsAffected: [mockData.length],
                output: {}
            };

            mockQuery = () => (Promise.resolve(mockResult));

            const result = await dataAccess.query<MockData>('SELECT * FROM MockData;');
            expect(result).toStrictEqual(mockResult);
        });

        it('should return IResult of supplied type with input and output params', async () => {

            const mockResult = {
                recordsets: [mockData],
                recordset: mockData,
                rowsAffected: [mockData.length],
                output: {}
            };

            mockQuery = () => (Promise.resolve(mockResult));

            const result1 = await dataAccess.query<MockData>('SELECT * FROM MockData;', [
                { name: 'input1', value: 'value1', type: TYPES.Text }
            ] as Params[], [
                { name: 'output1', value: 'value1', type: TYPES.Text }
            ] as Params[]);
            const result2 = await dataAccess.query<MockData>('SELECT * FROM MockData;', [
                { name: 'input1', value: 'value1' }
            ] as Params[], [
                { name: 'output1', value: 'value1' }
            ] as Params[]);

            expect(result1).toStrictEqual(mockResult);
            expect(result2).toStrictEqual(mockResult);
        });

        it('should return throw error in case of exception', async () => {

            const mockResult = new Error('Error occurred');

            mockQuery = () => (Promise.reject(mockResult));

            try {
                await dataAccess.query<MockData>('SELECT * FROM MockData;');
            } catch (error) {
                expect(error).toStrictEqual(mockResult);
            }
        });
    });

    describe('Query Entity Method', () => {
        it('should return IResult of supplied type with input and output params', async () => {

            const mockResult = {
                recordsets: [mockData],
                recordset: mockData,
                rowsAffected: [mockData.length],
                output: {}
            };
            const mockBody: MockBody = {
                input: 'value'
            };

            mockQuery = () => (Promise.resolve(mockResult));

            const result1 = await dataAccess.queryEntity<MockData, MockBody>("SELECT * FROM MockData WHERE @input = 'value';", mockBody, [
                { name: 'output1', value: 'value1', type: TYPES.Text }
            ] as Params[]);
            const result2 = await dataAccess.queryEntity<MockData, MockBody>("SELECT * FROM MockData WHERE @input = 'value'", mockBody, [
                { name: 'output1', value: 'value1' }
            ] as Params[]);

            expect(result1).toStrictEqual(mockResult);
            expect(result2).toStrictEqual(mockResult);
        });

        it('should return throw error in case of exception', async () => {

            const mockResult = new Error('Error occurred');
            const mockBody: MockBody = {
                input: 'value'
            };

            mockQuery = () => (Promise.reject(mockResult));

            try {
                await dataAccess.queryEntity<MockData, MockBody>('SELECT * FROM MockData;', mockBody);
            } catch (error) {
                expect(error).toStrictEqual(mockResult);
            }
        });
    });

    describe('Execute Method', () => {
        it('should return IProcedureResult of supplied type', async () => {

            const mockResult = {
                recordsets: [mockData],
                recordset: mockData,
                rowsAffected: [mockData.length],
                output: {}
            };

            mockExecute = () => (Promise.resolve(mockResult));

            const result = await dataAccess.execute<MockData>('MockProcedure;');
            expect(result).toStrictEqual(mockResult);
        });

        it('should return throw error in case of exception', async () => {

            const mockResult = new Error('Error occurred');

            mockExecute = () => (Promise.reject(mockResult));

            try {
                await dataAccess.execute<MockData>('MockProcedure;');
            } catch (error) {
                expect(error).toStrictEqual(mockResult);
            }
        });
    });

    describe('Execute Entity Method', () => {
        it('should return IResult of supplied type with input and output params', async () => {

            const mockResult = {
                recordsets: [mockData],
                recordset: mockData,
                rowsAffected: [mockData.length],
                output: {}
            };
            const mockBody: MockBody = {
                input: 'value'
            };

            mockExecute = () => (Promise.resolve(mockResult));

            const result1 = await dataAccess.executeEntity<MockData, MockBody>("SELECT * FROM MockData WHERE @input = 'value';", mockBody, [
                { name: 'output1', value: 'value1', type: TYPES.Text }
            ] as Params[]);
            const result2 = await dataAccess.executeEntity<MockData, MockBody>("SELECT * FROM MockData WHERE @input = 'value'", mockBody, [
                { name: 'output1', value: 'value1' }
            ] as Params[]);

            expect(result1).toStrictEqual(mockResult);
            expect(result2).toStrictEqual(mockResult);
        });

        it('should return throw error in case of exception', async () => {

            const mockResult = new Error('Error occurred');
            const mockBody: MockBody = {
                input: 'value'
            };

            mockExecute = () => (Promise.reject(mockResult));

            try {
                await dataAccess.executeEntity<MockData, MockBody>('SELECT * FROM MockData;', mockBody);
            } catch (error) {
                expect(error).toStrictEqual(mockResult);
            }
        });
    });
});

interface MockData {
    id: number;
    value: string;
}
interface MockBody {
    input: any;
}
