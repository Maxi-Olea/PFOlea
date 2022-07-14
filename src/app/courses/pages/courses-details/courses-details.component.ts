import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { courseToEdit, deleteCourse, loadCourseById } from 'src/app/store/features/courses/courses.actions';
import { selectCourseByIdSuccess, selectCourses } from 'src/app/store/features/courses/courses.selectors';
import { loadStudents } from 'src/app/store/features/students/students.actions';
import { selectStudentsSuccess } from 'src/app/store/features/students/students.selectors';
import { Student } from 'src/app/students/interfaces/student.interface';
import { StudentsService } from 'src/app/students/services/students.service';
import { Course } from '../../interfaces/course.interface';


@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss']
})
export class CoursesDetailsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  user!:User | null; //Datos del usuario logueado
  loading:boolean = false;

  course!:Course; //Curso a mostrar detalles
  students!:Student[];
  studentsByCourse:Student[] = [];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private studentsService: StudentsService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { 

  }

  ngOnInit(): void {
    this.titleService.setTitle('Detalles del Curso');
    this.loading = true;
    this.getUserData();
    this.getCourseDetails();
    this.getStudents();
  }

  getUserData() {
    this.subscriptions.add(
      this.authService.getUserData().subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  getCourseDetails() {
    this.route.params.subscribe(paramsId => {
      const id: number = paramsId['id'];
      this.store.dispatch(loadCourseById({ id }))
    });
    this.store.select(selectCourseByIdSuccess).subscribe((course) => {
      this.course = course.course;
      this.loading = course.loading;
    });
  }

  getStudents() {
    this.store.dispatch(loadStudents());
    let id:number = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.store.select(selectStudentsSuccess).subscribe((students) => {
      this.students = students.students;
      this.students.forEach(student => {
        if(student.cursos!.filter((course) => course.id == id).length > 0) {
          this.studentsByCourse.push(student)
        }
      });     
    })
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

  onDeleteInscription(student:Student) {
    /* Se busca el elemento por el id del curso en el array de cursos del estudiante,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el estudiante en el listado de estudiantes y se setean en el servicio*/
    let courses: Course[] = student.cursos!;
    let index = courses.findIndex((x) => x.id === this.course.id);
    courses.splice(index,1);
    student.cursos = courses;
    this.studentsService.editStudentById(student.id, student).subscribe((res) => {
      this._snackBar.open(`Se actualizó la información de los cursos de ${res.name} ${res.lastname}`, 'Ok');
    }, (error) => {
      this._snackBar.open(`${error} - No se pudo actualizar la información de los cursos del alumno`, 'Cerrar');
    })
    let indexOfStudent = this.studentsByCourse.findIndex((x) => x.id === student.id);
    this.studentsByCourse.splice(indexOfStudent,1);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
