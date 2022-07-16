import { createReducer, on } from "@ngrx/store";
import { AuthUser } from "src/app/core/interfaces/authUser.interface";

import { loadAuth, loadAuthSuccess } from "./auth.actions";

export interface AuthState {
    isAuth: AuthUser
}



export const initialState: AuthState = {
    isAuth: {
        isAuth: false,
        userData: null
    }
};

export const authReducer = createReducer(
    initialState,
    on(loadAuth, state => state),
    on(loadAuthSuccess, (state, { isAuth }) => {
        return{ ...state, isAuth }
    })
);