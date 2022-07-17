import { createReducer, on } from "@ngrx/store";
import { Inscription } from "src/app/inscriptions/interfaces/inscription.interface";
import { addInscription, loadInscriptions, loadInscriptionsByCourse, loadInscriptionsByCourseSuccess, loadInscriptionsSuccess } from "./inscriptions.actions";

export interface InscriptionState {
    loading: boolean,
    inscriptions: Inscription[],
    inscriptionsByCourse: Inscription[]
}

export const initialState: Readonly<InscriptionState> = {
    loading: true,
    inscriptions: [],
    inscriptionsByCourse: []
}

export const inscriptionsReducer = createReducer(
    initialState,
    on(loadInscriptions, (state) => {
        return {...state, loading:true}
    }),
    on(loadInscriptionsSuccess, (state, { inscriptions }) => {
        return {...state, inscriptions, loading:false}
    }),
    on(loadInscriptionsByCourse, (state) => {
        return {...state, loading:true}
    }),
    on(loadInscriptionsByCourseSuccess, (state, { inscriptionsByCourse }) => {
        return {...state, inscriptionsByCourse, loading:false}
    }),
    on(addInscription, (state, { inscription }) => {
        return {...state, ...inscription}
    })
)