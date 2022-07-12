import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersDialogComponent } from '../../components/users-dialog/users-dialog.component';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
  }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(UsersDialogComponent);
  }

  isLoggedIn() {
    this.subscription.add(
      this.authService.getIsLoggedIn().subscribe((res) => {
        if(res) {
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  login() {
    let username = this.loginForm.get('username')?.value
    let password = this.loginForm.get('password')?.value
    let users: User[]= [];
    this.subscription.add(
      this.authService.getUsers().subscribe((usersdata) => {
        users = usersdata;
        let user = users.find((usr) => usr.username === username)
        if(user && user.password === password) {
          this.authService.setIsLoggedIn(true, user);
          this.router.navigate(['dashboard']);
        } else {
          this.authService.setIsLoggedIn(false, null);
          this._snackBar.open('El usuario y/o la contraseña ingresadas son incorrectas', 'Cerrar')
        }
      })
    );
  }

}
