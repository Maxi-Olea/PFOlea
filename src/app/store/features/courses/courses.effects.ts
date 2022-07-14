import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { CourseService } from "src/app/courses/services/course.service";
import { addCourse, deleteCourse, editCourse, loadCourseById, loadCourseByIdSuccess, loadCourses, loadCoursesSuccess } from "./courses.actions";

@Injectable()
export class CoursesEffects {

    constructor(
        private actions$: Actions,
        private courseService: CourseService
    ) { }

    loadCourses$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadCourses),
            mergeMap(() => this.courseService.getCourses()
            .pipe(
                map(courses => loadCoursesSuccess({ courses })),
                catchError(() => EMPTY)
            ))
        )
    });

    loadCourseById$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadCourseById),
            mergeMap(course => this.courseService.getCourseById(course.id)
            .pipe(
                map((courseDetails) => loadCourseByIdSuccess({ courseDetails })),
                catchError(() => EMPTY)
            ))
        )
    });

    addCourse$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(addCourse),
            mergeMap((course) => this.courseService.addCourse(course.course)
            .pipe(
                map(() => loadCourses()),
                catchError(() => EMPTY)
            ))
        )
    });

    editCourse$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(editCourse),
            mergeMap((course) => this.courseService.editCourseById(course.id, course.course)
            .pipe(
                map(() => loadCourses()),
                catchError(() => EMPTY)
            ))
        )
    });

    deleteCourse$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(deleteCourse),
              mergeMap((course) => this.courseService.deleteCourseById(course.id)
              .pipe(
                map(() => loadCourses()),
                catchError(() => EMPTY)
              ))  
        )
    });
}