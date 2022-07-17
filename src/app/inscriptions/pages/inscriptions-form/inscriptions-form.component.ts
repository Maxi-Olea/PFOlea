import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { Course } from 'src/app/courses/interfaces/course.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { loadCourses } from 'src/app/store/features/courses/courses.actions';
import { selectCoursesSuccess } from 'src/app/store/features/courses/courses.selectors';
import { addInscription } from 'src/app/store/features/inscriptions/inscriptions.actions';
import { selectStudentToEdit } from 'src/app/store/features/students/students.selectors';
import { Student } from 'src/app/students/interfaces/student.interface';
import { Inscription } from '../../interfaces/inscription.interface';

@Component({
  selector: 'app-inscriptions-form',
  templateUrl: './inscriptions-form.component.html',
  styleUrls: ['./inscriptions-form.component.scss']
})
export class InscriptionsFormComponent implements OnInit, OnDestroy {
  
  subscriptions: Subscription = new Subscription();
  
  user!: User | null; // datos del usuario logueado
  studentToEdit!:Student | null; //datos del estudiante al que vamos a inscribir a un curso
  courses!: Course[]; //listado de todos los cursos disponibles
  coursesList!: Course[]; //listado los cursos disponibles para inscribirse que tiene disponible el alumno
  inscription!: Inscription;

  inscriptionForm: FormGroup;

  constructor(
    private titleService: Title,
    private router: Router,
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
    this.getUserData();
    this.getStudentToEdit();
    this.getCourses();
  }

  getUserData() {
    this.subscriptions.add(
      this.store.select(selectUserData).subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  getStudentToEdit() {
    this.subscriptions.add(
      this.store.select(selectStudentToEdit).subscribe((studentData) => {
        if(studentData) {
          this.studentToEdit = { ...studentData };          
        } else {
          this.router.navigate(['dashboard/inscriptions/list']);
        }
      })
    );
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
    this.router.navigate(['dashboard/inscriptions/', this.studentToEdit?.id]);
  }


  onSubmit() {
    let indexOfCourse = this.courses.findIndex((x) => x.id === this.inscriptionForm.get('course')?.value)
    let courseToAdd: Course = this.courses[indexOfCourse];
    this.inscription = {
      studentId: this.studentToEdit!.id,
      courseId: courseToAdd.id,
      date: new Date(),
      userId: this.user!.id
    }
    this.store.dispatch(addInscription({ inscription: this.inscription }));
    this._snackBar.open(`Se actualizaron los cursos de ${this.studentToEdit!.name} ${this.studentToEdit!.lastname}`, 'Ok');
    this.goBack();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
