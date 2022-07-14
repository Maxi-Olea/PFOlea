import { createReducer, on } from "@ngrx/store";

import { User } from "src/app/core/interfaces/user.interface";
import { loadAuth, loadAuthFailure, loadAuthSucces, retrievedUsersList } from "./auth.actions";

export interface State {
    user: User
}

export const authFeatureKey = 'auth';


export const initialState: State = {
    user: {
        id: 1,
        username:'',
        password:'',
        name:'',
        lastname:'',
        rol:''
    }
};

export const authReducer = createReducer(
    initialState,
    on(loadAuth, state => state),
    on(loadAuthSucces, (state, { user }) => {
        return{ ...state, user }
    }),
    on(loadAuthFailure, (state, action) => state)
);