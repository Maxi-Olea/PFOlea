import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './pages/students-list/students-list.component';
import { StudentsFormComponent } from './pages/students-form/students-form.component';
import { StudentsDetailsComponent } from './pages/students-details/students-details.component';
import { SharedModule } from '../shared/shared.module';
import { StudentsComponent } from './pages/students/students.component';


@NgModule({
  declarations: [
    StudentsListComponent,
    StudentsFormComponent,
    StudentsDetailsComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
