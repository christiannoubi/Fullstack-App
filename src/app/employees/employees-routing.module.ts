import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeEditGuard} from './employee-edit/employee-edit.guard';
import {EmployeeAddComponent} from './employee-add/employee-add.component';
import {EmployeeDetailGuard} from './employee-detail/employee-detail.guard';



const children: Routes = [
  {
    path: 'employee',
    children: [
      {path: '', component: EmployeeListComponent},
      {path: ':id', component: EmployeeDetailComponent,  canDeactivate: [EmployeeDetailGuard]},
      {path: ':id/add', component: EmployeeAddComponent },
      {path: ':id/edit', component: EmployeeEditComponent, canDeactivate: [EmployeeEditGuard]},
    ]
  }/*,
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [
    RouterModule.forChild(children)
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
