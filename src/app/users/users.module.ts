import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersDetailsComponent } from './pages/users-details/users-details.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailsComponent,
    UsersFormComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
