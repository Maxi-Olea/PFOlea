import { createAction, props } from "@ngrx/store";
import { AuthUser } from "src/app/core/interfaces/authUser.interface";
import { User } from "src/app/users/interfaces/user.interface";

export const loadTitle = createAction(
    '[Title] Load Title',
    props<{ title: string }>()
);

export const setTitle = createAction(
    '[Title] Get title',
    props<{ title: string }>()
);

export const loadAuth = createAction(
    '[Auth] Load Auth'
);

export const loadAuthSuccess = createAction(
    '[Auth] Load Auth Succes',
    props<{ isAuth: AuthUser }>()
);

export const checkAuth = createAction(
    '[Auth] Check login credentials',
    props<{ username: string, password:string }>()
);

export const setIsAuth = createAction(
    '[Auth] Set isAuth & UserData',
    props<{ isAuth: boolean, user: User }>()
);

export const loadUserDataSucces = createAction(
    '[Auth] Load User Data Succes',
    props<{ userData: User }>()
);

export const logOut = createAction(
    '[Auth] Log off'
);

export const loadAuthFailure = createAction(
    '[Auth] Load Auth Failure',
    props<{ error: any }>()
);

export const retrievedUsersList = createAction(
    '[User List / API] Retrieve Users Success',
    props<{ users: ReadonlyArray<User> }>()
);