import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { checkAuth } from 'src/app/store/auth/auth.actions';
import { selectIsAuth } from 'src/app/store/auth/auth.selector';
import { loadUsers } from 'src/app/store/features/users/users.actions';
import { UsersDialogComponent } from '../../components/users-dialog/users-dialog.component';

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
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers())
    this.isAuth();
  }

  openDialog() {
    this.dialog.open(UsersDialogComponent);
  }

  isAuth() {
    this.store.select(selectIsAuth).subscribe(isAuth => {
      if(isAuth) { //Si devuelve un usuario vaidado
        this.router.navigate(['/dashboard']);
      } else {
        this.openDialog();
      }
    });
  }

  login() {
    let username = this.loginForm.get('username')?.value
    let password = this.loginForm.get('password')?.value
    this.store.dispatch(checkAuth({ username, password }));
    this.store.select(selectIsAuth).subscribe(isAuth => {
      if(isAuth) { //Si devuelve un usuario vaidado
        this.router.navigate(['/dashboard']);
      } else {
        this._snackBar.open('El usuario y/o la contraseña ingresados son incorrectas', 'Cerrar');
      }      
    });
  }

}
