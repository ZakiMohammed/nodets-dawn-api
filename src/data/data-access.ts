import { ConnectionPool, config, IProcedureResult, ISqlType, IResult, Request } from 'mssql';

export class DataAccess {

    private pool: ConnectionPool;

    constructor(dbConfig?: config) {
        this.pool = new ConnectionPool(dbConfig ? dbConfig : {
            driver: process.env.SQL_DRIVER as string,
            server: process.env.SQL_SERVER as string,
            database: process.env.SQL_DATABASE as string,
            user: process.env.SQL_UID as string,
            password: process.env.SQL_PWD as string,
            options: {
                encrypt: false,
                enableArithAbort: false
            },
            pool: {
                min: 5,
                max: 10
            }
        });
    }

    get connectionPool(): ConnectionPool {
        return this.pool;
    }

    async query<T>(command: string, inputs: Params[] = [], outputs: Params[] = []): Promise<IResult<T>> {
        await this.pool.connect();
        const request = this.pool.request();
        this.assignParams(request, inputs, outputs);
        return request.query<T>(command);
    }

    async queryEntity<T, E>(command: string, entity: E, outputs: Params[] = []): Promise<IResult<T>> {
        await this.pool.connect();
        const request = this.pool.request();
        const inputs = this.fetchParams(entity);
        this.assignParams(request, inputs, outputs);
        return request.query<T>(command);
    }

    async execute<T>(procedure: string, inputs: Params[] = [], outputs: Params[] = []): Promise<IProcedureResult<T>> {
        await this.pool.connect();
        const request = this.pool.request();
        this.assignParams(request, inputs, outputs);
        return request.execute<T>(procedure);
    }

    async executeEntity<T, E>(command: string, entity: E, outputs: Params[] = []): Promise<IResult<T>> {
        await this.pool.connect();
        const request = this.pool.request();
        const inputs = this.fetchParams(entity);
        this.assignParams(request, inputs, outputs);
        return request.execute<T>(command);
    }

    private assignParams(request: Request, inputs: Params[], outputs: Params[]) {
        [inputs, outputs].forEach((operations, index) => {
            operations.forEach(operation => {
                if (operation.type) {
                    index === 0 ?
                        request.input(operation.name, operation.type, operation.value) :
                        request.output(operation.name, operation.type, operation.value);
                } else {
                    index === 0 ?
                        request.input(operation.name, operation.value) :
                        request.output(operation.name, operation.value);
                }
            });
        });
    }

    private fetchParams<T>(entity: T): Params[] {
        const params: Params[] = [];
        for (const key in entity) {
            /* istanbul ignore else */
            if ((entity as any).hasOwnProperty(key)) {
                const value = entity[key];
                params.push({
                    name: key,
                    value
                });
            }
        }
        return params;
    }
}

export interface Params {
    name: string;
    value: any;
    type?: (() => ISqlType) | ISqlType;
}

export enum ProcedureResponse {
    Success = 'Success',
    Unauthorized = 'Unauthorized',
    UniqueKeyViolation = 'Unique key violation'
}
