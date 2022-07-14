import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./courses.reducers";

export const selectCoursesState = createFeatureSelector<Readonly<CourseState>>('courses');

export const selectCourses = createSelector(
    selectCoursesState,
    (state) => state.courses
);

export const selectLoading = createSelector(
    selectCoursesState,
    (state) => state.loading
);

export const selectCourseById = createSelector(
    selectCoursesState,
    (state) => state.courseDetails
);

export const selectCoursesSuccess = createSelector(
    selectCourses,
    selectLoading,
    (courses, loading) => ({ courses, loading })
);

export const selectCourseByIdSuccess = createSelector(
    selectCourseById,
    selectLoading,
    (course, loading) => ({ course, loading })
);

export const selectCourseToEdit = createSelector(
    selectCoursesState,
    (state) => state.courseToEdit
);