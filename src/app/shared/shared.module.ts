import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNameDirective } from './directives/item-name.directive';
import { TitlesDirective } from './directives/titles.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { CourseIconPipe } from './pipes/course-icon.pipe';
import { RolPipe } from './pipes/rol.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    ItemNameDirective,
    TitlesDirective,
    CourseIconPipe,
    RolPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    CourseIconPipe,
    RolPipe,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
