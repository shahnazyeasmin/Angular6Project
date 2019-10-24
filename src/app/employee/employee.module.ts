import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmolpyeeRoutingModule } from './employee-routing.module';

import { ListEmployeeComponent } from './list-employee.component';
import { CreateEmployeeComponent } from './create-employee.component';
import { from } from 'rxjs';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,

    EmolpyeeRoutingModule,
    SharedModule
  ],
  declarations: [
    CreateEmployeeComponent,
    ListEmployeeComponent
  ],

})
export class EmployeeModule { }
