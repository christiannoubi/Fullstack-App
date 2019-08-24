import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoginService} from './login/login.service';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {EmployeeAddComponent} from '../employees/employee-add/employee-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: EmployeeAddComponent}
    ])
  ],
  declarations: [LoginComponent],
  providers: [LoginService],
  exports: [RouterModule]
})
export class UserModule {}
