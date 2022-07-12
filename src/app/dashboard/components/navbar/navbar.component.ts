import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  @Input() user!: User | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logOut() {
    this.authService.logOff();
    this.router.navigate(['/']);
  }

}
