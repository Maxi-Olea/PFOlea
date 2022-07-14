import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/interfaces/user.interface";

export const loadAuth = createAction(
    '[Auth] Load Auth'
);

export const loadAuthSucces = createAction(
    '[Auth] Load Auth Succes',
    props<{ user:User }>()
);

export const loadAuthFailure = createAction(
    '[Auth] Load Auth Failure',
    props<{ error: any }>()
);

export const retrievedUsersList = createAction(
    '[User List / API] Retrieve Users Success',
    props<{ users: ReadonlyArray<User> }>()
);