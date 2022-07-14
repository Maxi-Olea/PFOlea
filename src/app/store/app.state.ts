import { ActionReducerMap } from "@ngrx/store";
import { coursesReducer, CourseState } from "./features/courses/courses.reducers";
import { studentsReducer, StudentState } from "./features/students/students.reducer";

export interface AppState {
  students: Readonly<StudentState>;
  courses: Readonly<CourseState>;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    students: studentsReducer,
    courses: coursesReducer
}