import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { addCourse, editCourse } from 'src/app/store/features/courses/courses.actions';
import { selectCourseToEdit } from 'src/app/store/features/courses/courses.selectors';
import { Course } from '../../interfaces/course.interface';


@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  courseForm: FormGroup;
  courseToEdit!: Course | null;
  
  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {
    this.courseForm = this.fb.group({
      course: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      professor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      classes: ['', [Validators.required, Validators.min(5)]],
      hours: ['', [Validators.required, Validators.min(10)]],
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Formulario de Curso');
    this.subscriptions.add(
      this.store.select(selectCourseToEdit).subscribe((res) => {
        this.courseToEdit = res;      
      })
    );
    if(this.courseToEdit) {
      this.courseForm.get('course')?.patchValue(this.courseToEdit.course)
      this.courseForm.get('professor')?.patchValue(this.courseToEdit.professor)
      this.courseForm.get('email')?.patchValue(this.courseToEdit.email)
      this.courseForm.get('classes')?.patchValue(this.courseToEdit.classes)
      this.courseForm.get('hours')?.patchValue(this.courseToEdit.hours)
    }
  }

  onSubmit() {
    /*Evalua si el elemento es nuevo o a editar, si es nuevo agrega el curso al listado de cursos.
    Si es a editar edita el curso segun el id. finalmente actualiza los cursos en el servicio*/
    if(this.courseToEdit) { //Si se edita un curso existente
      this.courseForm.value['id'] = this.courseToEdit.id;
      let id:number = this.courseToEdit.id;
      let course:Course = this.courseForm.value;
      this.store.dispatch(editCourse({ id, course }));
      this.router.navigate(['dashboard/courses']);
      this._snackBar.open(`Se actualizó la información del curso ${course.course}`, 'Ok');
    } else { //Si se agrega un curso nuevo
      this.courseForm.value['students'] = [];
      let course: Course = this.courseForm.value
      this.store.dispatch(addCourse({ course }))
      this._snackBar.open(`Se agregó el curso ${course.course} exitosamente`, 'Ok');
      this.router.navigate(['dashboard/courses']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
