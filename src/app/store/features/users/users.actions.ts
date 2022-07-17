import { createAction, props } from "@ngrx/store";
import { User } from "src/app/users/interfaces/user.interface";

export const loadUsers = createAction(
    '[Users List] Load Users'
);

export const loadUsersSuccess = createAction(
    '[Users List / API] Retrieve Users Success',
    props<{ users: User[] }>()
);

export const loadUsersById = createAction(
    '[Users List] Load User by id',
    props<{ id: number }>()
);

export const loadUserByIdSuccess = createAction(
    '[Users List] Load User by id Success',
    props<{ userDetails: User }>()
);

export const addUser = createAction(
    '[Users List] Add User',
    props<{ user: User }>()
);

export const editUser = createAction(
    '[Users List] Edit User by id',
    props<{ id: number, user: User }>()
);

export const deleteUser = createAction(
    '[Users List] Delete User',
    props<{ id: number }>()
);

export const userToEdit = createAction(
    '[Users List] User to edit',
    props<{ userToEdit: User | null }>()
);