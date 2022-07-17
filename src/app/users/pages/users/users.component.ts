import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTitle } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent { 

  constructor(
    private store: Store
  ) { 
    store.dispatch(setTitle({title: 'Usuarios'}))
  }

}
