import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/users/interfaces/user.interface";
import { addUser, loadUserByIdSuccess, loadUsers, loadUsersById, loadUsersSuccess, userToEdit } from "./users.actions";

export interface UserState {
    users: User[],
    loading: boolean,
    userDetails: User,
    userToEdit: User | null
};

export const initialState: Readonly<UserState> = {
    users: [],
    loading: true,
    userDetails: {
        id: 0,
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        rol: ''
    },
    userToEdit: null
};

export const usersReducer = createReducer(
    initialState,
    on(loadUsers, (state) => {
        return {...state, loading:true}
    }),
    on(loadUsersSuccess, (state, { users }) => {
        return {...state, users, loading:false}
    }),
    on(addUser, (state, { user }) => {
        return {...state, ...user}
    }),
    on(loadUsersById, (state) => {
        return {...state, loading:true}
    }),
    on(loadUserByIdSuccess, (state, { userDetails }) => {
        return {...state, userDetails, loading:false}
    }),
    on(userToEdit, (state, { userToEdit }) => {
        return {...state, userToEdit}
    })
);