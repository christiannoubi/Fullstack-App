
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './login.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

    constructor(private loginService: LoginService,
                private router: Router) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkLoggedIn();
    }

    canLoad(route: Route): boolean {
      return this.checkLoggedIn();
    }

    checkLoggedIn(): boolean {
      if (localStorage.getItem('isCurrentUserLogged') === 'true') {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }

  }
