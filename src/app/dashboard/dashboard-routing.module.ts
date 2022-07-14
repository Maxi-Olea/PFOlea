import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full' },
      { 
        path: 'students', 
        loadChildren: () => import('../students/students.module')
        .then(m => m.StudentsModule)  
      },
      {
        path: 'courses',
        loadChildren: () => import('../courses/courses.module')
        .then(m => m.CoursesModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
