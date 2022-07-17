import { Course } from "src/app/courses/interfaces/course.interface";


export interface Student {
    id: number;
    name: string;
    lastname: string;
    email: string;
    profile?: string;
    gender?: string;
    birthday?: Date;
    cursos?: Course [];
}