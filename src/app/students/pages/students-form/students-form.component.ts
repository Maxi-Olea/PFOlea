import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { addStudent, editStudent } from 'src/app/store/features/students/students.actions';
import { selectStudentToEdit } from 'src/app/store/features/students/students.selectors';
import { Student } from '../../interfaces/student.interface';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  studentForm: FormGroup;

  studentToEdit!: Student | null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { 
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.subscriptions.add(
    this.store.select(selectStudentToEdit).subscribe((data) => {
      this.studentToEdit = data;      
    })
    )
    if(this.studentToEdit) {
      this.studentForm.get('name')?.patchValue(this.studentToEdit.name)
      this.studentForm.get('lastname')?.patchValue(this.studentToEdit.lastname)
      this.studentForm.get('email')?.patchValue(this.studentToEdit.email)
      this.studentForm.get('birthday')?.patchValue(this.studentToEdit.birthday)
    }
  }

  onSubmit() {
    if(this.studentToEdit) { // si estamos editando un alumno existente
      this.studentForm.value['id'] = this.studentToEdit.id;
      this.studentForm.value['cursos'] = this.studentToEdit.cursos;
      let id: number = this.studentToEdit.id;
      let student: Student = this.studentForm.value;

      this.store.dispatch(editStudent({ id: id, student:student }));
      this.router.navigate(['dashboard/students']);
    } else { // si estamos agregando un usuario nuevo
      this.store.dispatch(addStudent({ student:this.studentForm.value }));
      this.router.navigate(['dashboard/students']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
