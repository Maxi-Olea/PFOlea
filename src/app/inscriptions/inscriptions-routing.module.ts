import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsDetailsComponent } from './pages/inscriptions-details/inscriptions-details.component';
import { InscriptionsFormComponent } from './pages/inscriptions-form/inscriptions-form.component';
import { InscriptionsListComponent } from './pages/inscriptions-list/inscriptions-list.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';

const routes: Routes = [
  {
    path: '', component: InscriptionsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: InscriptionsListComponent },
      { path: 'form', component: InscriptionsFormComponent },
      { path: ':id', component: InscriptionsDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionsRoutingModule { }
