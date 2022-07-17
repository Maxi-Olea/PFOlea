import { createReducer, on } from "@ngrx/store";
import { Course } from "src/app/courses/interfaces/course.interface";
import { addCourse, courseToEdit, loadCourseById, loadCourseByIdSuccess, loadCourses, loadCoursesSuccess } from "./courses.actions";


export interface CourseState {
    courses: Course[],
    loading: boolean,
    courseDetails: Course,
    courseToEdit: Course | null
};

export const initialState: Readonly<CourseState> = {
    courses: [],
    loading: true,
    courseDetails: {
        id: 0,
        course: '',
        professor: '',
        email: ''
    },
    courseToEdit: null
};

export const coursesReducer = createReducer(
    initialState,
    on(loadCourses, (state) => {
        return {...state}
    }),
    on(loadCoursesSuccess, (state, { courses }) => {
        return {...state, courses, loading: false}
    }),
    on(addCourse, (state, { course }) => {
        return {...state, ...course}
    }),
    on(loadCourseById, (state) => {
        return {...state, loading:true}
    }),
    on(loadCourseByIdSuccess, (state, { courseDetails }) => {
        return {...state, courseDetails, loading:false}
    }),
    on(courseToEdit, (state, { courseToEdit }) => {
        return {...state, courseToEdit}
    })
);