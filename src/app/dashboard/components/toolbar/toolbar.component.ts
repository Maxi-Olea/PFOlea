import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/users/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { logOut } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) { }

  @Input() user!: User | null; //datos del usuario logueado
  @Output() toggleEmitter = new EventEmitter<boolean>();

  isOpen: boolean = true;

  toggleSidenav() {
    this.isOpen = !this.isOpen;
    this.toggleEmitter.emit(true);
  }
  
  logOut() {
    this.store.dispatch(logOut());
    this.router.navigate(['/']);
  }

}
