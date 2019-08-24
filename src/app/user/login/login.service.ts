import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Employee} from '../../employees/employee';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from './user';


@Injectable()
export class LoginService {

  private loginUrl = '/api/login';
  public currentUser: Observable<Employee>;


  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password })
      .pipe(map(response => {
          localStorage.setItem('isCurrentUserLogged', response.successfulLogged);
          return response;
      }));
  }

  logout() {
    localStorage.removeItem('isCurrentUserLogged');
    this.router.navigate(['/login']);
  }

}
