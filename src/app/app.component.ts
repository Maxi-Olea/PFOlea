import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadAuth } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PFOlea';


  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(loadAuth())
  }
  
}
