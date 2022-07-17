import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { selectUserData } from 'src/app/store/auth/auth.selector';
import { deleteUser, loadUsers, userToEdit } from 'src/app/store/features/users/users.actions';
import { selectUsersSuccess } from 'src/app/store/features/users/users.selector';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit, OnDestroy {

  subscriptions:Subscription = new Subscription();
  loading: boolean = false;

  @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  usersData!:User[]; //array de todos los usuarios registrados en la app
  usr!:User | null; //datos del usuario que esta logueado en este momento

  displayedColumns = ['id', 'name', 'username', 'rol', 'actions'];
  dataSource = new MatTableDataSource();
  
  constructor(
    private titleService: Title,
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Usuarios');
    this.loading = true;
    this.getUserData();
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getUserData() {
    this.subscriptions.add(
      this.store.select(selectUserData).subscribe((userData) => {
        this.usr = userData;
      })
    );
  }

  getUsers() {
    this.store.dispatch(loadUsers())
    this.subscriptions.add(
      this.store.select(selectUsersSuccess).subscribe((users) => {        
      this.dataSource.data = users.users;
      this.loading = users.loading;      
      })
    );
  }

  onClickAdd() {
    this.store.dispatch(userToEdit({ userToEdit: null }))
    this.router.navigate(['dashboard/users/form']);
  }

  onClickDetails(user:User){
    this.router.navigate([`dashboard/users/${user.id}`])
  }

  onClickEdit(user:User){
    this.store.dispatch(userToEdit({ userToEdit: user }));
    this.router.navigate(['dashboard/users/form']);
  }

  onDeleteuser(user: User){
    this.store.dispatch(deleteUser({ id: user.id }));
    this._snackBar.open(`El usuario ${user.name} ${user.lastname} fue eliminado exitosamente`, 'Cerrar');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
