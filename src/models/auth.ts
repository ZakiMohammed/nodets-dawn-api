import { User } from "./user";

export interface Auth {
    token: string;
    authUser: AuthUser;
}

export interface AuthUser {
    id: number;
    userName: string;
    iat?: number;
    exp?: number;
}
