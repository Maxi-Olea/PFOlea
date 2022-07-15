import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/courses/interfaces/course.interface';
import { CourseService } from 'src/app/courses/services/course.service';
import { loadCourses } from 'src/app/store/features/courses/courses.actions';
import { selectCoursesSuccess } from 'src/app/store/features/courses/courses.selectors';
import { editStudent } from 'src/app/store/features/students/students.actions';
import { selectStudentToEdit } from 'src/app/store/features/students/students.selectors';
import { Student } from 'src/app/students/interfaces/student.interface';
import { StudentsService } from 'src/app/students/services/students.service';

@Component({
  selector: 'app-inscriptions-form',
  templateUrl: './inscriptions-form.component.html',
  styleUrls: ['./inscriptions-form.component.scss']
})
export class InscriptionsFormComponent implements OnInit {
  
  subscriptions: Subscription = new Subscription();
  
  studentToEdit!:Student | null; //datos del estudiante al que vamos a inscribir a un curso
  courses!: Course[]; //listado de todos los cursos disponibles
  coursesList!: Course[]; //listado los cursos disponibles para inscribirse que tiene disponible el alumno

  inscriptionForm: FormGroup;

  constructor(
    private titleService: Title,
    private studentsService: StudentsService,
    private coursesService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {
    this.inscriptionForm = this.fb.group({
      course: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Formulario de Inscripción');
    // this.subscriptions.add(
    //   this.studentsService.getStudentToEdit().subscribe((student) => {
    //     if(student) {
    //       this.studentToEdit = student;
    //     } else {
    //       this.router.navigate(['dashboard/inscriptions'])
    //     }
    //   })
    // );
    this.store.select(selectStudentToEdit).subscribe((studentData) => {
      if(studentData) {
        this.studentToEdit = { ...studentData };
        console.log('studentToEdit:', this.studentToEdit);
        
      } else {
        this.router.navigate(['dashboard/inscriptions/list']);
      }
    })
    this.getCourses();
  }

  getCourses() {
    this.store.select(selectCoursesSuccess).subscribe((coursesData) => {
      if(coursesData.courses.length === 0) {
        this.store.dispatch(loadCourses());
      }
      this.courses = coursesData.courses;
    })
  }

  goBack() {
    this.router.navigate([`dashboard/inscriptions/${this.studentToEdit!.id}`])
  }


  onSubmit() {
    let indexOfCourse = this.courses.findIndex((x) => x.id === this.inscriptionForm.get('course')?.value)
    let courseToAdd: Course = this.courses[indexOfCourse];
    this.studentToEdit!.cursos! = [...this.studentToEdit!.cursos!, courseToAdd ]; // Lo hago de esta manera pq studentToEdit es un objeto inmutable
    this.store.dispatch(editStudent({ id: this.studentToEdit!.id, student: this.studentToEdit! }));
    this._snackBar.open(`Se actualizaron los cursos de ${this.studentToEdit!.name} ${this.studentToEdit!.lastname}`, 'Ok');
    this.goBack();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
