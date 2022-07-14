import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDetailsComponent } from './pages/students-details/students-details.component';
import { StudentsFormComponent } from './pages/students-form/students-form.component';
import { StudentsListComponent } from './pages/students-list/students-list.component';
import { StudentsComponent } from './pages/students/students.component';

const routes: Routes = [
  {
    path: '', component: StudentsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' }, 
      { path: 'list', component: StudentsListComponent },
      { path: 'form', component: StudentsFormComponent },
      { path: ':id', component: StudentsDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
