import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StudentState } from './students.reducer';
 
export const selectStudentsState = createFeatureSelector<Readonly<StudentState>>('students');

export const selectStudents = createSelector(
    selectStudentsState,
    (state) => state.students
);

export const selectLoading = createSelector(
    selectStudentsState,
    (state) => state.loading
);

export const selectStudentById = createSelector(
    selectStudentsState,
    (state) => state.studentDetails
);

export const selectStudentsSuccess = createSelector(
    selectStudents,
    selectLoading,
    (students, loading) => ({ students, loading })
);

export const selectStudentByIdSucces = createSelector(
    selectStudentById,
    selectLoading,
    (student, loading) => ({ student, loading })
);

export const selectStudentToEdit = createSelector(
    selectStudentsState,
    (state) => state.studentToEdit
);