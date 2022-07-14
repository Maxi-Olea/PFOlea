import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { loadStudentById } from 'src/app/store/features/students/students.actions';
import { selectStudentByIdSucces } from 'src/app/store/features/students/students.selectors';
import { Student } from '../../interfaces/student.interface';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  user!:User | null; //Datos del usuario logueado
  loading: boolean = false;

  student!: Student; //Estudiante a mostrar detalles

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthService,
    private studentService: StudentsService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.getUserData();
    this.getStudentDetails();
    this.store.select(selectStudentByIdSucces).subscribe((data) => {
      this.student = data;
      this.loading = false;
    })
  }

  getUserData() {
    this.subscriptions.add(
      this.userService.getUserData().subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  getStudentDetails() {
    this.route.params.subscribe(paramsId => {
      const id: number = paramsId['id'];
      this.store.dispatch(loadStudentById({ id }))
    })
    // let id:number = parseInt(this.route.snapshot.paramMap.get('id') as string);
    // this.subscriptions.add(
    //   this.studentService.getStudentById(id).subscribe((res) => {
    //     this.student = res;
    //     this.loading = false;
    //   }, (error) => {
    //     this._snackBar.open(`${error} - No se pudo recuperar la información del alumno`, 'Cerrar');
    //     this.router.navigate(['dashboard/students']);
    //   })
    // );
  }

  onClickEdit() {
    this.studentService.setStudentToEdit(this.student)
    .then(() => {
      this.router.navigate(['dashboard/students/studentform']);
    })
    .catch((error) => this._snackBar.open(error.message, 'Cerrar'));
  }

  onDeleteStudent() {
    this.subscriptions.add(
      this.studentService.deleteStudentById(this.student.id).subscribe((res) => {
        this._snackBar.open(`${res.name} ${res.lastname} fue eliminado con exito del listado de alumnos`, 'Ok');
        this.router.navigate(['dashboard/students']);
      }, (error) => {
        this._snackBar.open(`${error} - No se pudo eliminar al alumno`, 'Cerrar');
      })
    );   
  }

  onClickInscription() {
    this.studentService.setStudentToEdit(this.student)
    .then(() => this.router.navigate(['dashboard/inscriptions/addinscription']))
    .catch((error) => this._snackBar.open(error.message, 'Cerrar'))
  }

  // onDeleteInscription(course:Courses) {
  //   /* Se busca el elemento por el id del curso en el array de cursos del estudiante,
  //   Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
  //   Por ultimo, se actualiza el estudiante en el listado de estudiantes y se setean en el servicio*/
  //   let courses: Courses[] = this.student.cursos!;
  //   let index = courses.findIndex((x) => x.id === course.id);
  //   courses.splice(index,1);
  //   this.student.cursos = courses;
  //   this.studentService.editStudentById(this.student.id, this.student).subscribe((res) => {
  //     this._snackBar.open(`Se actualizó la información de los cursos de ${res.name} ${res.lastname}`, 'Ok');
  //   }, (error) => {
  //     this._snackBar.open(`${error} - No se pudo actualizar la información de los cursos del alumno`, 'Cerrar');
  //   })
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
