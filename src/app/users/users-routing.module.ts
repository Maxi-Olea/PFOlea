import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDetailsComponent } from './pages/users-details/users-details.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: UsersListComponent },
      { path: 'form', component: UsersFormComponent },
      { path: ':id', component: UsersDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
