import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PracticeTest1Component } from './practice/practice-test1.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'project1', component: PracticeTest1Component },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
