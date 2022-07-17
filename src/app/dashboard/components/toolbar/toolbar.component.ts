import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/users/interfaces/user.interface';
import { logOut } from 'src/app/store/auth/auth.actions';
import { selectTitle } from 'src/app/store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title$: Observable<any> = new Observable()

  constructor(
    private router: Router,
    private store: Store
  ) { }

  @Input() user!: User | null; //datos del usuario logueado
  @Output() toggleEmitter = new EventEmitter<boolean>();

  isOpen: boolean = true;

  ngOnInit(): void {
    this.title$ = this.store.select(selectTitle);
  }

  toggleSidenav() {
    this.isOpen = !this.isOpen;
    this.toggleEmitter.emit(true);
  }
  
  logOut() {
    this.store.dispatch(logOut());
    this.router.navigate(['/']);
  }

}
