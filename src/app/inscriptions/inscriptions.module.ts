import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsListComponent } from './pages/inscriptions-list/inscriptions-list.component';
import { InscriptionsDetailsComponent } from './pages/inscriptions-details/inscriptions-details.component';
import { InscriptionsFormComponent } from './pages/inscriptions-form/inscriptions-form.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InscriptionsListComponent,
    InscriptionsDetailsComponent,
    InscriptionsFormComponent,
    InscriptionsComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule
  ]
})
export class InscriptionsModule { }
