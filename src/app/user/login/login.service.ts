import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Employee} from '../../employees/employee';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = '//localhost:8080/login';
  private currentUserSubject: BehaviorSubject<Employee>;
  public currentUser: Observable<Employee>;


  constructor(private http: HttpClient,
              private router: Router) {
  }

  public get currentUserValue(): Employee {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.loginUrl}`, { username, password })
      .pipe(map(employee => {
        if (employee && employee.token) {
          localStorage.setItem('currentUser', JSON.stringify(employee));
          this.currentUserSubject.next(employee);
        }
        return employee;
      }));
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
