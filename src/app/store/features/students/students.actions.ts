import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/students/interfaces/student.interface';

export const loadStudents = createAction(
  '[Students List] Load Students'
);
 
export const loadStudentSuccess = createAction(
  '[Students List/API] Retrieve Students Success',
  props<{ students: Student[] }>()
);

export const loadStudentById = createAction(
  '[Students List] Load Student by id',
  props<{ id: number }>()
);

export const loadStudentByIdSuccess = createAction(
  '[Students List] Load Student by id Success',
  props<{ studentDetails: Student }>()
);

export const addStudent = createAction(
  '[Students List] Add Student',
  props<{ student: Student }>()
);

export const editStudent = createAction(
  '[Students List] Edit student by id',
  props<{ id: number, student: Student }>()
);

export const deleteStudent = createAction(
  '[Students List] Delete Student',
  props<{ id: number }>()
);

export const studentToEdit = createAction(
  '[Students List] Student to edit',
  props<{ studentToEdit: Student | null }>()
);