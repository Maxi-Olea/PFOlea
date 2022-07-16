import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { checkAuth, loadAuth, loadAuthSuccess, loadUserDataSucces, logOut } from "./auth.actions";

@Injectable()
export class AuthEffects {

    constructor (
        private actions$: Actions,
        private authService: AuthService
    ) { }

    loadIsAuth$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadAuth),
            mergeMap(() => this.authService.getAuthUser()
            .pipe(
                map((authUser) => loadAuthSuccess({ isAuth: authUser })),
                catchError(() => EMPTY)
            ))
        )
    });

    login$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(checkAuth),
            mergeMap((login) => this.authService.login(login.username, login.password)
            .pipe(
                map(() => loadAuth()),
                catchError(() => EMPTY)
            ))
        )
    });

    loadUserData$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadUserDataSucces),
            mergeMap(() => this.authService.getUserData()
            .pipe(
                map(() => loadAuth()),
                catchError(() => EMPTY)
            ))
        )
    });

    logOut$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(logOut),
            mergeMap(() => this.authService.logOut()
            .pipe(
                map(() => loadAuth()),
                catchError(() => EMPTY)
            ))
        )
    });

}