import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styles: [
    `.dialog {
      min-width: 380px;
      }
      table {
          width: 100%;
          background-color: #F5F5F5;
      }`
  ]
})

export class UsersDialogComponent {

  displayedColumns = ['users', 'password', 'rol'];
  dataSource = [
    {
      user: 'Admin',
      pass: 'admin1234',
      rol: 'Administrador'
    },
    {
      user: 'User01',
      pass: 'user1234',
      rol: 'Usuario'
    },
  ]

}
