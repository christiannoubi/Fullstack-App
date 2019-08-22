import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {EmployeeData} from './employee-data';
import {EmployeeService} from './employee.service';
import { EmployeeAddComponent } from './employee-add/employee-add.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
/*
    InMemoryWebApiModule.forRoot(EmployeeData),
*/
    EmployeesRoutingModule
  ],
  declarations: [
    EmployeeDetailComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeeAddComponent
  ],
  providers: [EmployeeService]
})
export class EmployeeModule {}
