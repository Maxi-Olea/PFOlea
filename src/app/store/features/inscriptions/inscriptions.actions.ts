import { createAction, props } from "@ngrx/store";
import { Inscription } from "src/app/inscriptions/interfaces/inscription.interface";

export const loadInscriptions = createAction(
    '[Inscriptions List] Load Inscriptions by Student id',
    props<{ id: number }>()
);

export const loadInscriptionsSuccess = createAction(
    '[Inscriptions List] Load Inscriptions Success',
    props<{ inscriptions: Inscription[] }>()
);

export const loadInscriptionsByCourse = createAction(
    '[Inscriptions List] Load Inscriptions by Course id',
    props<{ id: number }>()
);

export const loadInscriptionsByCourseSuccess = createAction(
    '[Inscriptions List] Load Inscriptions by Course id Success',
    props<{ inscriptionsByCourse: Inscription[] }>()
);

export const addInscription = createAction(
    '[Inscriptions List] Add inscription to a Course',
    props<{ inscription: Inscription }>()
);

export const deleteInscription = createAction(
    '[Inscriptions List] Delete inscription to a Course',
    props<{ id: number }>()
);