import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/core/interfaces/user.interface";
import { retrievedUsersList } from "./auth.actions";


export const initialState: ReadonlyArray<User> = [];

export const usersListReducer = createReducer(
    initialState,
    on(retrievedUsersList, (state, { users }) => users)
);