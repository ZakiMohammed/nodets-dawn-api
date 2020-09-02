import { DataAccess } from '../data/data-access';
import { User } from '../models/user';

export class UserRepository {
    static async authenticate(userName: string, password: string): Promise<User | null> {
        try {
            const dataAccess = new DataAccess();
            const result = await dataAccess.execute(`AuthenticateUser`, [
                { name: 'UserName', value: userName },
                { name: 'Password', value: password },
            ]);

            if (result.recordset.length) {
                return result.recordset[0] as unknown as User;
            } else {
                return null;
            }

        } catch (error) {
            throw error;
        }
    }
}
