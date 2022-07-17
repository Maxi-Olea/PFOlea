import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTitle } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent { 

  constructor(
    private store: Store
  ) { 
    store.dispatch(setTitle({title: 'Alumnos'}))
  }

}


