import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/interfaces/user.interface';
import { addUser, editUser } from 'src/app/store/features/users/users.actions';
import { selectUserToEdit } from 'src/app/store/features/users/users.selector';

interface Rol {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, OnDestroy {

  subscriptions:Subscription = new Subscription();

  userForm: FormGroup

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  phonePattern: string = "^((\\+91-?)|0)?[0-9]{10}$";

  userToEdit!:User | null;

  roles:Rol[] = [{value:'admin', viewValue:'Administrador'}, {value:'user', viewValue:'Usuario'}];

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      rol: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      checkpass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    }, { validator: this.checkPassword });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Formulario de Usuario');
    this.getUserToEdit();
  }

  getUserToEdit() {
    this.subscriptions.add(
      this.store.select(selectUserToEdit).subscribe((user) => {
        this.userToEdit = user;      
        })
    );
      if(this.userToEdit) {
        this.userForm.get('name')?.patchValue(this.userToEdit.name)
        this.userForm.get('lastname')?.patchValue(this.userToEdit.lastname)
        this.userForm.get('username')?.patchValue(this.userToEdit.username)
        this.userForm.get('rol')?.patchValue(this.userToEdit.rol)
        this.userForm.get('email')?.patchValue(this.userToEdit.email)
        this.userForm.get('address')?.patchValue(this.userToEdit.address)
        this.userForm.get('phone')?.patchValue(this.userToEdit.phone)
      }
  }

  onSubmit() { //Evalua si el elemento es nuevo o a editar y luego envía al service los datos.
    if(this.userToEdit) { //si estamos editando un usuario existente
      this.userForm.value['id'] = this.userToEdit.id;
      let id:number = this.userToEdit.id!;
      let user: User = this.userForm.value
      this.store.dispatch(editUser({ id, user }));
      this._snackBar.open(`Se actualizó la información de ${user.username}`, 'Cerrar');
      this.router.navigate(['dashboard/users']);
    } else { // si estamos agregando un usuario nuevo
      const user: User = this.userForm.value
      this.store.dispatch(addUser({ user: user }))
      this._snackBar.open(`El usuario ${user.username} se agregó correctamente`, 'Ok');
      this.router.navigate(['dashboard/users']);
    }
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls?.['password']?.value
    const checkpass = group.controls?.['checkpass']?.value
    return pass === checkpass ? null : { notSame: true }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
