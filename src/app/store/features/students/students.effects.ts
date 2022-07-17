import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, EMPTY, mergeMap, map } from "rxjs";
import { StudentsService } from "src/app/students/services/students.service";
import { addStudent, deleteStudent, editStudent, loadStudentById, loadStudentByIdSuccess, loadStudents, loadStudentSuccess } from "./students.actions";

@Injectable()
export class StudentsEffects {

    constructor(
        private actions$: Actions,
        private studentsService: StudentsService
    ) { }

    loadStudents$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadStudents),
            mergeMap(() => this.studentsService.getStudents()
            .pipe(
                map(students => loadStudentSuccess({ students })),
                catchError(() => EMPTY)
            ))
        )
    });

    loadStudentById$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(loadStudentById),
            mergeMap((student) => this.studentsService.getStudentById(student.id)
            .pipe(
                map((studentDetails) => loadStudentByIdSuccess({ studentDetails })),
                catchError(() => EMPTY)
            ))
        )
    });

    addStudent$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(addStudent),
            mergeMap((student) => this.studentsService.addStudent(student.student)
            .pipe(
                map(() => loadStudents()),
                catchError(()=> EMPTY)
            ))
        )
    });

    editStudent$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(editStudent),
            mergeMap((student) => this.studentsService.editStudentById(student.id, student.student)
            .pipe(
                map((x) => {
                    return(
                        loadStudentById({ id: x.id }),
                        loadStudents()
                    )
                }),
                catchError(() => EMPTY)
            ))
        )
    })

    deleteStudent$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(deleteStudent),
            mergeMap((student) => this.studentsService.deleteStudentById(student.id)
            .pipe(
                map(() => loadStudents()),
                catchError(() => EMPTY)
            ))
        )
    });

}