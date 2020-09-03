import * as MOCKS from '../mocks/user';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../models/user';
import { AccountController } from './account-controller';
import jwt, { Secret, SignOptions, SignCallback } from "jsonwebtoken";

jest.mock('jsonwebtoken', () => jest.fn());

describe('Account Controller', () => {
    let mockJwt: jest.Mock;
    let mockSign: any;
    let spyAuthenticate: jest.SpyInstance;
    let request: any;
    let response: any;
    let next: any;

    beforeEach(() => {

        mockJwt = (jwt as unknown as jest.Mock);
        mockJwt.mockImplementation(() => ({
            sign: (payload: string, secretOrPrivateKey: Secret, options: SignOptions, callback: SignCallback) => mockSign(payload, secretOrPrivateKey, options, callback)
        }));
        mockSign = (payload: string, secretOrPrivateKey: Secret, options: SignOptions, callback: SignCallback) => {
            callback(null, 'token');
        };

        spyAuthenticate = jest.spyOn(UserRepository, 'authenticate');

        process.env = {
            GLOBAL_CACHE: 'CACHE_STORAGE',
            JWT_SECRET_KEY: 'JWT_SECRET_KEY',
            JWT_EXPIRES_IN: '0'
        };
        request = {
            app: {
                settings: {
                    CACHE_STORAGE: {
                        set: jest.fn()
                    }
                }
            }
        };
        response = {
            locals: {
                authUser: {
                    "id": 1,
                    "userName": "admin",
                    "iat": 1599116523,
                    "exp": 1599118323
                }
            },
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

    describe('Login', () => {

        beforeEach(() => {
            request = {
                body: {
                    UserName: 'admin',
                    Password: 'admin'
                }
            };
        });

        it('should login', async () => {
            const user = MOCKS.USER;
            const result = { ...user };

            spyAuthenticate.mockImplementation(() => Promise.resolve(result));

            await AccountController.login(request, response, next);

            expect(spyAuthenticate).toHaveBeenCalledTimes(1);
            spyAuthenticate.mock.results[0].value.then((mockResult: User) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not login if not found', async () => {
            const result = null;

            spyAuthenticate.mockImplementation(() => Promise.resolve(result));

            await AccountController.login(request, response, next);

            expect(spyAuthenticate).toHaveBeenCalledTimes(1);
            spyAuthenticate.mock.results[0].value.then((mockResult: User | null) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not login if jwt error occurred', async () => {
            const user = MOCKS.USER;
            const result = { ...user };

            spyAuthenticate.mockImplementation(() => Promise.resolve(result));
            mockSign = (payload: string, secretOrPrivateKey: Secret, options: SignOptions, callback: SignCallback) => {
                callback(new Error('Error occurred'), undefined);
            };

            await AccountController.login(request, response, next);

            expect(spyAuthenticate).toHaveBeenCalledTimes(1);
            spyAuthenticate.mock.results[0].value.then((mockResult: User | null) => {
                expect(mockResult).toStrictEqual(result);
            });
        });

        it('should not login if error occurred', async () => {
            spyAuthenticate.mockImplementation(() => Promise.reject(new Error('Error occurred')));

            await AccountController.login(request, response, next);

            expect(spyAuthenticate).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });

    describe('Authorized', () => {
        it('should authorized', async () => {
            await AccountController.authorized(request, response, next);
            expect(response.json).toHaveBeenCalled();
        });

        it('should not authorized if error occurred', async () => {
            response = null;
            await AccountController.authorized(request, response, next);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Logout', () => {
        it('should logout', async () => {
            request.body = {
                token: 'token',
                exp: 1599118323
            };
            await AccountController.logout(request, response, next);
            expect(response.json).toHaveBeenCalled();
        });

        it('should not logout if error occurred', async () => {
            request.body = null;
            await AccountController.logout(request, response, next);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});
