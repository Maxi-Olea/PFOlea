import { createReducer, on } from "@ngrx/store";
import { AuthUser } from "src/app/core/interfaces/authUser.interface";

import { loadAuth, loadAuthSuccess, loadTitle, setTitle } from "./auth.actions";

export interface AuthState {
    isAuth: AuthUser,
    title: string
}



export const initialState: AuthState = {
    isAuth: {
        isAuth: false,
        userData: null
    },
    title: ''
};

export const authReducer = createReducer(
    initialState,
    on(loadAuth, state => state),
    on(loadAuthSuccess, (state, { isAuth }) => {
        return{ ...state, isAuth }
    }),
    on(loadTitle, state => state),
    on(setTitle, (state, { title }) => {
        return { ...state, title }
    })
);