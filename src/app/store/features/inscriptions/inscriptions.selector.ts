import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InscriptionState } from "./inscriptions.reducer";

export const selectInscriptionsState = createFeatureSelector<Readonly<InscriptionState>>('inscriptions');

export const selectInscriptions = createSelector(
    selectInscriptionsState,
    (state) => state.inscriptions
);

export const selectLoading = createSelector(
    selectInscriptionsState,
    (state) => state.loading
);

export const selectInscriptionsSuccess = createSelector(
    selectInscriptions,
    selectLoading,
    (inscriptions, loading) => ({ inscriptions, loading })
);

export const selectInscriptionsByCourse = createSelector(
    selectInscriptionsState,
    (state) => state.inscriptionsByCourse
);

export const selectInscriptionsByCourseSuccess = createSelector(
    selectInscriptionsByCourse,
    selectLoading,
    (inscriptionsByCourse, loading) => ({ inscriptionsByCourse, loading })
);