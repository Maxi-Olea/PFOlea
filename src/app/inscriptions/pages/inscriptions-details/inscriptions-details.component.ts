import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Course } from 'src/app/courses/interfaces/course.interface';
import { editStudent, loadStudentById, studentToEdit } from 'src/app/store/features/students/students.actions';
import { selectStudentByIdSucces } from 'src/app/store/features/students/students.selectors';
import { Student } from 'src/app/students/interfaces/student.interface';
import { StudentsService } from 'src/app/students/services/students.service';


@Component({
  selector: 'app-inscriptions-details',
  templateUrl: './inscriptions-details.component.html',
  styleUrls: ['./inscriptions-details.component.scss']
})
export class InscriptionsDetailsComponent implements OnInit {

  subscriptions: Subscription = new Subscription();

  user!:User | null; //Datos del usuario logueado
  loading: boolean = true;

  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  student!: Student; //Estudiante a mostrar detalles
  // studentsData!: Student[]; //Listado de estudiantes

  displayedColumns = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

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
      this.authService.getUserData().subscribe((userData) => {
        this.user = userData;
      })
    );
  }


  getStudentDetails() {
    this.route.params.subscribe(paramsId => {
      const id: number = paramsId['id'];
      this.store.dispatch(loadStudentById({ id }));
      this.store.select(selectStudentByIdSucces).subscribe((studentData) => {
        this.student = { ...studentData.student };
        this.dataSource.data = this.student.cursos!;
        this.loading = studentData.loading;
      });
    });
  }

  onClickAdd() {
    this.store.dispatch(studentToEdit({ studentToEdit: this.student }));
    this.router.navigate(['dashboard/inscriptions/form']);
    // this.studentsService.setStudentToEdit(this.student)
    // .then(() => this.router.navigate(['dashboard/inscriptions/addinscription']))
    // .catch((error) => this._snackBar.open(error.message, 'Cerrar'))
  }

  onClickDetails(course: Course) {
    this.router.navigate([`dashboard/courses/${course.id}`])
  }

  onDeleteInscription(course: Course) {
    /* Se busca el elemento por el id del curso en el array de cursos del estudiante,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el estudiante en el listado de estudiantes y se setean en el servicio*/
    let courses: Course[] = [...this.student.cursos!];    
    let index = courses.findIndex((x) => x.id === course.id);
    courses.splice(index,1);
    this.dataSource.data = courses;
    this.table.renderRows();
    this.student.cursos = courses;    
    this.store.dispatch(editStudent({ id: this.student.id, student:this.student }));
    this._snackBar.open(`Se actualizó la información de los cursos de ${this.student.name} ${this.student.lastname}`, 'Ok');
    // this.studentsService.editStudentById(this.student.id, this.student).subscribe((res) => {
    //   this._snackBar.open(`Se actualizó la información de los cursos de ${res.name} ${res.lastname}`, 'Ok');
    // }, (error) => {
    //   this._snackBar.open(`${error} - No se pudo actualizar la información de los cursos del alumno`, 'Cerrar');
    // })
  }

  // updateStudent() {
  //   let indexOfStudent = this.studentsData.findIndex((x) => x.id === this.student.id);
  //   this.studentsData[indexOfStudent] = this.student;
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
 
}
