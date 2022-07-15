import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./users.reducer";

export const selectorUsersState = createFeatureSelector<Readonly<UserState>>('users');

export const selectUsers = createSelector(
    selectorUsersState,
    (state) => state.users
);

export const selecLoading = createSelector(
    selectorUsersState,
    (state) => state.loading
);

export const selectUserById = createSelector(
    selectorUsersState,
    (state) => state.userDetails
);

export const selectUsersSuccess = createSelector(
    selectUsers,
    selecLoading,
    (users, loading) => ({ users, loading })
);

export const selectUserByIdSuccess = createSelector(
    selectUserById,
    selecLoading,
    (user, loading) => ({ user, loading })
);

export const selectUserToEdit = createSelector(
    selectorUsersState,
    (state) => state.userToEdit
);