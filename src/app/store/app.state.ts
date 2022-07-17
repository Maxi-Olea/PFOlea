import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { coursesReducer, CourseState } from "./features/courses/courses.reducers";
import { inscriptionsReducer, InscriptionState } from "./features/inscriptions/inscriptions.reducer";
import { studentsReducer, StudentState } from "./features/students/students.reducer";
import { usersReducer, UserState } from "./features/users/users.reducer";

export interface AppState {
  auth: Readonly<AuthState>
  students: Readonly<StudentState>;
  courses: Readonly<CourseState>;
  users: Readonly<UserState>;
  inscriptions: Readonly<InscriptionState>
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    auth: authReducer,
    students: studentsReducer,
    courses: coursesReducer,
    users: usersReducer,
    inscriptions: inscriptionsReducer
}