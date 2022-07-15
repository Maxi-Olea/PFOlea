import { ActionReducerMap } from "@ngrx/store";
import { coursesReducer, CourseState } from "./features/courses/courses.reducers";
import { studentsReducer, StudentState } from "./features/students/students.reducer";
import { usersReducer, UserState } from "./features/users/users.reducer";

export interface AppState {
  students: Readonly<StudentState>;
  courses: Readonly<CourseState>;
  users: Readonly<UserState>
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    students: studentsReducer,
    courses: coursesReducer,
    users: usersReducer
}