import { createAction, props } from "@ngrx/store";
import { Course } from "src/app/courses/interfaces/course.interface";

export const loadCourses = createAction(
    '[Courses List] Load Courses'
);

export const loadCoursesSuccess = createAction(
    '[Courses List / API] Retrieve Courses Success',
    props<{ courses: Course[] }>()
);

export const loadCourseById = createAction(
    '[Courses List] Load Course by id',
    props<{ id: number }>()
);

export const loadCourseByIdSuccess = createAction(
    '[Course List] Load Course by id Success',
    props<{ courseDetails: Course }>()
);

export const addCourse = createAction(
    '[Course List] Add Course',
    props<{ course: Course }>()
);

export const editCourse = createAction(
    '[Courses List] Edit Course by id',
    props<{ id: number, course: Course }>()
);

export const deleteCourse = createAction(
    '[Courses List] Delete Course',
    props<{ id: number }>()
);

export const courseToEdit = createAction(
    '[Course List] Student to edit',
    props<{ courseToEdit: Course | null }>()
);