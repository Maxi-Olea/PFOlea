import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { InscriptionService } from "src/app/inscriptions/services/inscription.service";
import { addInscription, deleteInscription, loadInscriptions, loadInscriptionsSuccess } from "./inscriptions.actions";

@Injectable()
export class InscriptionsEffects {

    constructor(
        private actions$: Actions,
        private inscriptionService: InscriptionService
    ) { }

    loadInscriptions$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadInscriptions),
            mergeMap((inscription) => this.inscriptionService.getInscriptionsByStudentId(inscription.id)
            .pipe(
                map((inscriptions) => loadInscriptionsSuccess({ inscriptions })),
                catchError(() => EMPTY)
            ))
        )
    });
    
    addInscription$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(addInscription),
            mergeMap((inscription) => this.inscriptionService.addInscription(inscription.inscription)
            .pipe(
                map((x) => loadInscriptions({ id: x.studentId })),
                catchError(() => EMPTY)
            ))
        )
    });

    deleteInscription$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(deleteInscription),
            mergeMap((inscription) => this.inscriptionService.deleteInscription(inscription.id)
            .pipe(
                map((x) => loadInscriptions({ id: x.studentId })),
                catchError(() => EMPTY)
            ))
        )
    });
}