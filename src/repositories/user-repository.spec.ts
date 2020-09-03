import { DataAccess, Params } from '../data/data-access';
import { UserRepository } from './user-repository';
import * as MOCKS from '../mocks/user';

jest.mock('../data/data-access');
jest.mock('mssql');

describe('User Repository', () => {
    let mockDataAccess: jest.Mock;
    let mockExecute: any;

    beforeEach(() => {
        mockDataAccess = (DataAccess as unknown as jest.Mock);
        mockDataAccess.mockImplementation(() => ({
            execute: <T>(procedure: string, inputs: Params[] = [], outputs: Params[] = []) => mockExecute(),
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Authenticate', () => {
        it('should authenticate', async () => {
            const result = {
                recordset: [
                    MOCKS.USER
                ]
            };

            mockExecute = () => (Promise.resolve(result));

            const user = await UserRepository.authenticate(MOCKS.USER.UserName, MOCKS.USER.Password);
            expect(user).toStrictEqual(MOCKS.USER);
        });

        it('should not authenticate if not found', async () => {
            const result = {
                recordset: []
            };

            mockExecute = () => (Promise.resolve(result));

            const user = await UserRepository.authenticate(MOCKS.USER.UserName, MOCKS.USER.Password);
            expect(user).toStrictEqual(null);
        });

        it('should not authenticate if error occurred', async () => {
            mockExecute = () => (Promise.reject(new Error('Error occurred')));

            await UserRepository.authenticate(MOCKS.USER.UserName, MOCKS.USER.Password).catch(error => {
                expect(error).toBeDefined();
            });
        });
    });
});
