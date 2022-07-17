import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/users/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { logOut } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() user!: User | null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) { }

  logOut() {
    this.store.dispatch(logOut());
    this.router.navigate(['/']);
  }

}
