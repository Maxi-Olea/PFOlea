import { ActionReducerMap } from "@ngrx/store";
import { Student } from "../students/interfaces/student.interface";
import { studentsReducer, StudentState } from "./features/students/students.reducer";

export interface AppState {
  students: Readonly<StudentState>;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    students: studentsReducer
}