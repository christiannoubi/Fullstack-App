import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employee',
    loadChildren: './employees/employee.module#EmployeeModule' },
  { path: 'login', loadChildren: './user/user.module#UserModule' },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
       { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
