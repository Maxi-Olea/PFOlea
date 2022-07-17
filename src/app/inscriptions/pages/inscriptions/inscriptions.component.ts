import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setTitle } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {

  constructor(
    private store: Store
  ) { 
    store.dispatch(setTitle({title: 'Inscripciones'}))
  }

}
