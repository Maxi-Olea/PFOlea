import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { Course } from 'src/app/courses/interfaces/course.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { deleteStudent, editStudent, loadStudentById, studentToEdit } from 'src/app/store/features/students/students.actions';
import { selectStudentByIdSucces } from 'src/app/store/features/students/students.selectors';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  user!:User | null; //Datos del usuario logueado
  loading: boolean = true;

  student!: Student; //Estudiante a mostrar detalles

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.getUserData();
    this.getStudentDetails();
    this.store.select(selectStudentByIdSucces).subscribe((studentData) => {
      this.student = studentData.student;
      this.loading = studentData.loading;
    })
  }

  getUserData() {
    this.subscriptions.add(
      this.store.select(selectUserData).subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  getStudentDetails() {
    this.route.params.subscribe(paramsId => {
      const id: number = paramsId['id'];
      this.store.dispatch(loadStudentById({ id }))
    })
  }

  onClickEdit() {
    this.store.dispatch(studentToEdit({ studentToEdit: this.student }));
    this.router.navigate(['dashboard/students/form']);

  }

  onDeleteStudent() {
    this.store.dispatch(deleteStudent({ id: this.student.id }));
    this._snackBar.open(`${this.student.name} ${this.student.lastname} fue eliminado con exito del listado de alumnos`, 'Ok');
    this.router.navigate(['dashboard/students']);
  }

  onClickInscription() {
    // this.studentService.setStudentToEdit(this.student)
    // .then(() => this.router.navigate(['dashboard/inscriptions/addinscription']))
    // .catch((error) => this._snackBar.open(error.message, 'Cerrar'))
    this.store.dispatch(editStudent({ id: this.student.id, student: this.student }));
  }

  onDeleteInscription(course:Course) {
    /* Se busca el elemento por el id del curso en el array de cursos del estudiante,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el estudiante en el listado de estudiantes y se setean en el servicio*/
    let courses: Course[] = this.student.cursos!;
    let index = courses.findIndex((x) => x.id === course.id);
    courses.splice(index,1);
    this.student.cursos = courses;
    this.store.dispatch(editStudent({ id: this.student.id, student: this.student }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
