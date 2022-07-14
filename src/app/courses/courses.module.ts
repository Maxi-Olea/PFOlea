import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';
import { CoursesDetailsComponent } from './pages/courses-details/courses-details.component';
import { CoursesFormComponent } from './pages/courses-form/courses-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CoursesDetailsComponent,
    CoursesFormComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
