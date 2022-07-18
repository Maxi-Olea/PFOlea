import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { mergeMap, of, Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { Course } from 'src/app/courses/interfaces/course.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { deleteStudent, loadStudentById, studentToEdit } from 'src/app/store/features/students/students.actions';
import { selectStudentByIdSucces } from 'src/app/store/features/students/students.selectors';
import { Student } from '../../interfaces/student.interface';
import { deleteInscription, loadInscriptions } from 'src/app/store/features/inscriptions/inscriptions.actions';
import { InscriptionData } from 'src/app/inscriptions/interfaces/inscriptionData.interface';
import { selectCoursesSuccess } from 'src/app/store/features/courses/courses.selectors';
import { selectUsersSuccess } from 'src/app/store/features/users/users.selector';
import { selectInscriptionsSuccess } from 'src/app/store/features/inscriptions/inscriptions.selector';
import { loadCourses } from 'src/app/store/features/courses/courses.actions';
import { loadUsers } from 'src/app/store/features/users/users.actions';

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
  inscriptionsData: InscriptionData[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.store.dispatch(loadUsers());
    this.getUserData();
    this.getStudentDetails();
    this.store.select(selectStudentByIdSucces).subscribe((studentData) => {
      this.student = studentData.student;
      this.loading = studentData.loading;
    })
    this.getInscriptions()
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
      this.store.dispatch(loadStudentById({ id }));
      this.store.dispatch(loadInscriptions({ id }));
    })
  }

  getInscriptions() {
    this.subscriptions.add(
      this.store.select(selectInscriptionsSuccess)
      .pipe(
        mergeMap((inscriptions) => {
          let inscriptionsData: InscriptionData[] = [];
          let coursesData:Course[] = [];
          let usersData:User[] = [];
          if(inscriptions.inscriptions.length > 0) {
            this.store.select(selectCoursesSuccess).subscribe(courses => coursesData = courses.courses);
            this.store.select(selectUsersSuccess).subscribe(users => usersData = users.users);

            inscriptions.inscriptions.forEach(inscription => { //Recupero la información de los cursos y usuarios x inscripción
              let inscriptionData: InscriptionData = {
                ...inscription,
                course: coursesData.find(course => course.id == inscription.courseId)!.course,
                username: usersData.find(user => user.id == inscription.userId)!.username,
                student: `${this.student.name} ${this.student.lastname}`
              }
              inscriptionsData.push(inscriptionData)
            });
          } else {
            inscriptionsData = [];
          }
        return of({ inscriptionsData, loading: inscriptions.loading })
        })
      )
      .subscribe((inscriptionsData) => {
        this.inscriptionsData = inscriptionsData.inscriptionsData
        this.loading = inscriptionsData.loading;        
      })
      
      );
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
    this.store.dispatch(studentToEdit({ studentToEdit: this.student }));
    this.router.navigate(['dashboard/inscriptions/form']);
  }

  onDeleteInscription(inscription:InscriptionData) {
    /* Se busca el elemento por el id del curso en el array de cursos del estudiante,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el estudiante en el listado de estudiantes y se setean en el servicio*/
    // let courses: Course[] = this.student.cursos!;
    // let index = courses.findIndex((x) => x.id === course.id);
    // courses.splice(index,1);
    // this.student.cursos = courses;
    //this.store.dispatch(editStudent({ id: this.student.id, student: this.student }));
    this.store.dispatch(deleteInscription({ id: inscription.id! }))
    this.getInscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
