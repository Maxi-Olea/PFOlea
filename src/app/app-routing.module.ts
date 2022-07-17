import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./core/core.module')
    .then(m => m.CoreModule) 
  },
  {
    path: 'dashboard',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module')
    .then(m => m.DashboardModule)
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
