import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, throwError } from "rxjs";
import { UsersService } from "src/app/users/services/users.service";
import { addUser, deleteUser, editUser, loadUserByIdSuccess, loadUsers, loadUsersById, loadUsersSuccess } from "./users.actions";

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }

    loadUsers$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadUsers),
            mergeMap(() => this.usersService.getUsers()
            .pipe(
                map((users) => loadUsersSuccess({ users })),
                catchError(() => EMPTY)
            ))
        )
    });

    loadUserById$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadUsersById),
            mergeMap((user) => this.usersService.getUserById(user.id)
            .pipe(
                map((userDetails) => loadUserByIdSuccess({ userDetails })),
                catchError(() => EMPTY)
            ))
        )
    });

    addUser$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(addUser),
            mergeMap((user) => this.usersService.addUser(user.user)
            .pipe(
                map(() => loadUsers()),
                catchError(() => EMPTY)
            ))
        )
    });

    editUser$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(editUser),
            mergeMap((user) => this.usersService.editUser(user.id, user.user)
            .pipe(
                map(() => loadUsers()),
                catchError(() => EMPTY)
            ))
        )
    });

    deleteUser$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(deleteUser),
            mergeMap((user) => this.usersService.deleteUser(user.id)
            .pipe(
                map(() => loadUsers()),
                catchError(() => EMPTY)
            ))
        )
    });

}