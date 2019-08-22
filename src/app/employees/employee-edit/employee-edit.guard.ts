import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {EmployeeEditComponent} from './employee-edit.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEditGuard implements CanDeactivate <EmployeeEditComponent>  {

  canDeactivate(component: EmployeeEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (component.isDirty) {
      const firstName = component.employee.firstName || 'New Product';
      return confirm(`Navigate away and lose all changes to ${firstName}?`);
    }
    return true;
  }
}
