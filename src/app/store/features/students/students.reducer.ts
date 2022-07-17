import { createReducer, on } from '@ngrx/store';
import { Student } from 'src/app/students/interfaces/student.interface';
import { addStudent, editStudent, loadStudentById, loadStudentByIdSuccess, loadStudents, loadStudentSuccess, studentToEdit } from './students.actions';

export interface StudentState {
    students: Student[],
    loading: boolean,
    studentDetails: Student
    studentToEdit: Student | null
}


export const initialState: Readonly<StudentState> = {
    students: [],
    loading: true,
    studentDetails: {
        id: 0,
        name: '',
        lastname: '',
        email: '',
        birthday: new Date(),
    },
    studentToEdit: null
};

export const studentsReducer = createReducer(
  initialState,
  on(loadStudents, (state) => {
    return {...state, loading:true}
  }),
  on(loadStudentSuccess, (state, { students }) => {
    return {...state, students, loading:false}
  }),
  on(addStudent, (state, { student }) => {
    return {...state, ...student}
  }),
  on(editStudent, (state, { student }) => {
    return {...state, ...student}
  }),
  on(loadStudentById, (state) => {
    return {...state, loading:true}
  }),
  on(loadStudentByIdSuccess, (state, { studentDetails }) => {
    return {...state, studentDetails, loading: false}
  }),
  on(studentToEdit, (state, { studentToEdit }) => {
    return {...state, studentToEdit}
  })
);