import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  @Input() user!: User | null; //datos del usuario logueado
  @Output() toggleEmitter = new EventEmitter<boolean>();

  isOpen: boolean = true;

  toggleSidenav() {
    this.isOpen = !this.isOpen;
    this.toggleEmitter.emit(true);
  }
  
  logOut() {
    this.authService.logOff();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
