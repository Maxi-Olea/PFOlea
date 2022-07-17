import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { mergeMap, of, Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { Course } from 'src/app/courses/interfaces/course.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { loadCourses } from 'src/app/store/features/courses/courses.actions';
import { selectCoursesSuccess } from 'src/app/store/features/courses/courses.selectors';
import { deleteInscription, loadInscriptions } from 'src/app/store/features/inscriptions/inscriptions.actions';
import { selectInscriptionsSuccess } from 'src/app/store/features/inscriptions/inscriptions.selector';
import { loadStudentById, studentToEdit } from 'src/app/store/features/students/students.actions';
import { selectStudentByIdSucces } from 'src/app/store/features/students/students.selectors';
import { loadUsers } from 'src/app/store/features/users/users.actions';
import { selectUsersSuccess } from 'src/app/store/features/users/users.selector';
import { Student } from 'src/app/students/interfaces/student.interface';
import { InscriptionData } from '../../interfaces/inscriptionData.interface';


@Component({
  selector: 'app-inscriptions-details',
  templateUrl: './inscriptions-details.component.html',
  styleUrls: ['./inscriptions-details.component.scss']
})
export class InscriptionsDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  user!:User | null; //Datos del usuario logueado
  loading: boolean = true;

  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  student!: Student; //Estudiante a mostrar detalles

  displayedColumns = ['id', 'courseId', 'name', 'date', 'user', 'actions'];
  dataSource = new MatTableDataSource();

  studentCourses!: Course[];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {this.store.dispatch(loadCourses());
  store.dispatch(loadUsers()); }

  ngOnInit(): void {
    this.dataSource.data = []
    this.titleService.setTitle('Detalles de las inscripciones del Alumno');
    this.loading = true;
    this.getUserData();
    this.getStudentDetails();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
      this.store.dispatch(loadInscriptions({ id }))
      this.subscriptions.add(
        this.store.select(selectStudentByIdSucces).subscribe((studentData) => {
          this.student = { ...studentData.student };
        })
      );
      this.subscriptions.add(
        this.store.select(selectInscriptionsSuccess)
        .pipe(
          mergeMap((inscriptions) => {
            let inscriptionsData: InscriptionData[] = [];
            let coursesData:Course[] = [];
            let usersData:User[] = [];
            if(inscriptions.inscriptions.length > 0) {
              this.store.select(selectCoursesSuccess).subscribe(courses => {
                coursesData = courses.courses                
              })
              this.store.select(selectUsersSuccess).subscribe(users => {
                usersData = users.users                
              })

              inscriptions.inscriptions.forEach(inscription => { //Recupero la información de los cursos y usuarios x inscripción
                let inscriptionData: InscriptionData = {
                  ...inscription,
                  course: coursesData.find(course => course.id == inscription.courseId)!.course,
                  username: usersData.find(user => user.id == inscription.userId)!.username,
                  student: `${this.student.name} ${this.student.lastname}`
                }
                inscriptionsData.push(inscriptionData)
              });
            }
          return of({ inscriptionsData, loading: inscriptions.loading })
          })
        )
        .subscribe((inscriptionsData) => {
          this.dataSource.data = inscriptionsData.inscriptionsData
          this.loading = inscriptionsData.loading;        
        })
      );
    });
  }

  onClickAdd() {
    this.store.dispatch(studentToEdit({ studentToEdit: this.student }));
    this.router.navigate(['dashboard/inscriptions/form']);
  }

  // onClickDetails(course: Course) {
  //   this.router.navigate([`dashboard/courses/${course.id}`])
  // }

  onDeleteInscription(inscription: InscriptionData) {
    this.store.dispatch(deleteInscription({ id:inscription.id!}));
    this._snackBar.open(`Se actualizó la información de los cursos de ${this.student.name} ${this.student.lastname}`, 'Ok');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
 
}
