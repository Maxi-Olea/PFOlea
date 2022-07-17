import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { mergeMap, of, Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { courseToEdit, deleteCourse, loadCourseById } from 'src/app/store/features/courses/courses.actions';
import { selectCourseByIdSuccess } from 'src/app/store/features/courses/courses.selectors';
import { loadStudents } from 'src/app/store/features/students/students.actions';
import { selectStudentsSuccess } from 'src/app/store/features/students/students.selectors';
import { Student } from 'src/app/students/interfaces/student.interface';
import { Course } from '../../interfaces/course.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { deleteInscription, loadInscriptionsByCourse } from 'src/app/store/features/inscriptions/inscriptions.actions';
import { selectInscriptionsByCourseSuccess } from 'src/app/store/features/inscriptions/inscriptions.selector';
import { selectUsersSuccess } from 'src/app/store/features/users/users.selector';
import { InscriptionData } from 'src/app/inscriptions/interfaces/inscriptionData.interface';
import { loadUsers } from 'src/app/store/features/users/users.actions';


@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss']
})
export class CoursesDetailsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  user!:User | null; //Datos del usuario logueado
  loading:boolean = true;

  course!:Course; //Curso a mostrar detalles
  students!:Student[];
  inscriptionsByCourse:InscriptionData[] = [];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { 
    this.store.dispatch(loadStudents());
    this.store.dispatch(loadUsers());
  }

  ngOnInit(): void {
    this.titleService.setTitle('Detalles del Curso');
    this.getUserData();
    this.getCourseDetails();
  }

  getUserData() {
    this.subscriptions.add(
      this.store.select(selectUserData).subscribe((userData => {
        this.user = userData;
      }))
    );
  }

  getCourseDetails() {
    this.route.params.subscribe(paramsId => {
      const id: number = paramsId['id'];
      this.store.dispatch(loadCourseById({ id }))
    });
    this.subscriptions.add(
      this.store.select(selectCourseByIdSuccess).subscribe((course) => {
        this.course = course.course;
        this.loading = course.loading;
        this.getStudents();
      })
    );
  }

  getStudents() {
    this.store.dispatch(loadInscriptionsByCourse({ id: this.course.id }));
    this.subscriptions.add(
      this.store.select(selectInscriptionsByCourseSuccess)
      .pipe(
        mergeMap((inscriptions) => {
          let inscriptionsData: InscriptionData[] = [];
          let studentsData: Student[] = [];
          let usersData: User[] = [];
          if(inscriptions.inscriptionsByCourse.length > 0) {
            this.store.select(selectStudentsSuccess).subscribe((students) => studentsData = students.students);
            this.store.select(selectUsersSuccess).subscribe((users) => usersData = users.users);

            inscriptions.inscriptionsByCourse.forEach(inscription => {
              let student = studentsData.find(student => student.id == inscription.studentId);
              let inscriptionData: InscriptionData = {
                ...inscription,
                course: this.course.course,
                username: usersData.find(user => user.id == inscription.userId)!.username,
                student: `${student?.name} ${student?.lastname}`,
              }
              inscriptionsData.push(inscriptionData)
            });
          }
        return of({inscriptionsData, loading: inscriptions.loading})
        })
      )
      .subscribe((inscriptionsData) => {
        this.inscriptionsByCourse = inscriptionsData.inscriptionsData;
        this.loading = inscriptionsData.loading;
        
      })
    );
  }

  onClickEdit() {
    this.store.dispatch(courseToEdit({ courseToEdit: this.course }))
    this.router.navigate(['dashboard/courses/form']);
  }

  onDeleteCourse() {
    this.store.dispatch(deleteCourse({ id: this.course.id }))
    this._snackBar.open(`El curso de ${this.course.course } fue eliminado  con exito`, 'Ok');
    this.router.navigate(['dashboard/courses']);
  }

  onDeleteInscription(inscription:InscriptionData) {
    this.store.dispatch(deleteInscription({ id:inscription.id! }))
    this._snackBar.open(`Se actualizó la información de los cursos de ${inscription.student}`, 'Ok');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
