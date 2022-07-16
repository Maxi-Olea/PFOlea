import { User } from "./user.interface";

export interface AuthUser {
    isAuth: boolean,
    userData: User | null
}