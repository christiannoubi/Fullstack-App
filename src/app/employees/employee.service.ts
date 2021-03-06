import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';

import {Employee} from './employee';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()

export class EmployeeService {
   private employeeUrl = 'api/employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.employeeUrl + '/' + id)
      .pipe(
        tap(data => console.log('getEmployee: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    employee.id = null;
    return this.http.post<Employee>(this.employeeUrl, employee, { headers: headers })
      .pipe(
        tap(data => console.log('createEmployee: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteEmployee(id: number): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeeUrl}/${id}`;
    return this.http.delete<void>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteEmployee: ' + id)),
        catchError(this.handleError)
      );
  }

  updateEmployee(employee: Employee): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.employeeUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee,{ headers: headers })
      .pipe(
        tap(() => console.log('updateEmployee: ' + employee.id)),
        // Return the product on an update
        map(() => employee),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
