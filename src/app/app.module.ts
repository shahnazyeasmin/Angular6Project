import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './/app-routing.module';

import { EmployeeService } from './employee/employee.service';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeModule } from './employee/employee.module';
import { PracticeModule } from './practice/practice.module';
import { PracticeTest1Component } from './practice/practice-test1.component';


@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    PageNotFoundComponent,
    PracticeTest1Component
  ],
  imports: [
    BrowserModule,
    EmployeeModule,
    AppRoutingModule,
    PracticeModule,
    HttpClientModule

  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
