import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesDetailsComponent } from './pages/courses-details/courses-details.component';
import { CoursesFormComponent } from './pages/courses-form/courses-form.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { CoursesComponent } from './pages/courses/courses.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CoursesListComponent },
      { path: 'form', component: CoursesFormComponent },
      { path: ':id', component: CoursesDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
