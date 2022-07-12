import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNameDirective } from './directives/item-name.directive';
import { TitlesDirective } from './directives/titles.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';



@NgModule({
  declarations: [
    ItemNameDirective,
    TitlesDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
