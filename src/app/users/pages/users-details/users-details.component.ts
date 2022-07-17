import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { deleteUser, loadUsersById, userToEdit } from 'src/app/store/features/users/users.actions';
import { selectUserByIdSuccess } from 'src/app/store/features/users/users.selector';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit, OnDestroy {

  subscriptions:Subscription = new Subscription();
  loading: boolean = true;

  user!:User; //Usuario a mostrar los detalles

  usr!:User | null; //datos del usuario que esta logueado en este momento

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Detalles del Usuario');
    this.loading = true;
    this.getUserData();
    this.getUserDetails();
  }

  getUserData() {
    this.subscriptions.add(
      this.store.select(selectUserData).subscribe((userData) => {
        this.usr = userData;
      })
    );
  }

  getUserDetails() { //recuperamos la informacion del usuario solicitado por el id del mismo
    this.subscriptions.add(
      this.route.params.subscribe(paramsId => {
        const id: number = paramsId['id'];
        this.store.dispatch(loadUsersById({ id }))
      })
    );
    this.store.select(selectUserByIdSuccess).subscribe((details) => {            
      this.user = details.user;
      this.loading = details.loading
    });
  }

  onClickEdit(){
    this.store.dispatch(userToEdit({ userToEdit: this.user }))
    this.router.navigate(['dashboard/users/form']);
  }

  onDeleteuser(){
    this.store.dispatch(deleteUser({ id: this.user.id }));
    this._snackBar.open(`el usuario ${this.user.username} fue eliminado con exito`, 'Ok');
    this.router.navigate(['dashboard/users'])
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

