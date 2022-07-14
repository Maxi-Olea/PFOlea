import { Student } from "src/app/students/interfaces/student.interface";

export interface Course {
    id: number;
    course: string;
    professor?: string;
    email?: string;
    students?: Student[];
}