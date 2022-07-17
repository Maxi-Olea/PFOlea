import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<Readonly<AuthState>>('auth');

export const selectIsAuth = createSelector(
    selectAuthState,
    (state) => state.isAuth.isAuth
);

export const selectUserData = createSelector(
    selectAuthState,
    (state) => state.isAuth.userData
);

export const selectAuthSuccess = createSelector(
    selectIsAuth,
    selectUserData,
    (isAuth, userData) => ({ isAuth, userData })
);

export const selectTitle = createSelector(
    selectAuthState,
    (state) => state.title
);