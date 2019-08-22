import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {EmployeeDetailComponent} from './employee-detail.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailGuard implements CanDeactivate <EmployeeDetailComponent>  {

  canDeactivate(component: EmployeeDetailComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (component.isDirty) {
      const firstName = component.employee.firstName || 'New Product';
      return confirm(`Navigate away and lose all changes to ${firstName} ?`);
    }
    return true;
  }
}
