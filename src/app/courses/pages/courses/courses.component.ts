import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTitle } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent { 

  constructor(
    private store: Store
  ) { 
    store.dispatch(setTitle({title: 'Cursos'}))
  }

}
