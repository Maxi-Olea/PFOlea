import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { ROOT_REDUCERS } from './store/app.state';
import { StudentsEffects } from './store/features/students/students.effects';
import { CoursesEffects } from './store/features/courses/courses.effects';
import { UsersEffects } from './store/features/users/users.effects';
import { AuthEffects } from './store/auth/auth.effects';
import { InscriptionsEffects } from './store/features/inscriptions/inscriptions.effects';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      AuthEffects,
      CoursesEffects,
      StudentsEffects,
      UsersEffects,
      InscriptionsEffects
    ]),

    CoreModule,
    DashboardModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
