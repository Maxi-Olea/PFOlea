import { User } from "../../users/interfaces/user.interface";

export interface AuthUser {
    isAuth: boolean,
    userData: User | null
}