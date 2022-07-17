export interface User {
    id: number;
    username: string;
    name: string;
    lastname: string;
    email?: string;
    address?: string;
    phone?: number;
    password?: string;
    rol: string;
}