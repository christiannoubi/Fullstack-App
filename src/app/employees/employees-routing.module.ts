import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeEditGuard} from './employee-edit/employee-edit.guard';
import {EmployeeAddComponent} from './employee-add/employee-add.component';
import {LoginGuard} from '../user/login/login.guard';



const children: Routes = [
  {
    path: 'employee',
    canActivate: [LoginGuard],
    data: { preload: true },
    children: [
      {path: '', component: EmployeeListComponent},
      {path: 'add', component: EmployeeAddComponent },
      {path: ':id', component: EmployeeDetailComponent },
      {path: ':id/edit', component: EmployeeEditComponent, canDeactivate: [EmployeeEditGuard]},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(children)
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
