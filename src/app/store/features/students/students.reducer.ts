import { createReducer, on } from '@ngrx/store';
import { Student } from 'src/app/students/interfaces/student.interface';
import { addStudent, loadStudentByIdSuccess, loadStudents, loadStudentSuccess, studentToEdit } from './students.actions';

export interface StudentState {
    students: Student[],
    loading: boolean,
    studentDetails: Student
    studentToEdit: Student | null
};


export const initialState: Readonly<StudentState> = {
    students: [],
    loading: true,
    studentDetails: {
        id: 0,
        name: '',
        lastname: '',
        email: '',
        birthday: new Date(),
        cursos: []
    },
    studentToEdit: null
};

export const studentsReducer = createReducer(
  initialState,
  on(loadStudents, (state) => {
    return {...state}
  }),
  on(loadStudentSuccess, (state, { students }) => {
    return {...state, students, loading: false}
  }),
  on(addStudent, (state, { student }) => {
    return {...state, ...student}
  }),
  on(loadStudentByIdSuccess, (state, { studentDetails }) => {
    return {...state, studentDetails}
  }),
  on(studentToEdit, (state, { studentToEdit }) => {
    return {...state, studentToEdit}
  })
  
);