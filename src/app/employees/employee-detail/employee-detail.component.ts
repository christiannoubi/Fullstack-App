import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  pageTitle = 'Employee Detail';
  employee: Employee ;
  id: string;
  sub: Subscription [] = [];
  errorMessage: string;


  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router) {
    this.id =  this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.getEmployee();
    }
  }

  getEmployee() {
    this.employeeService.getEmployee(this.id)
      .subscribe(
        employee => this.employee = employee,
        error => this.errorMessage = <any>error);
  }

  editEmployee(): void {
    this.router.navigate([`/employee/${this.employee.id}/edit`]);
  }

  deleteEmployee(): void {
    if (this.employee.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.employee.firstName} was deleted`);
    } else {
      if (confirm(`Really delete the employee: ${this.employee.firstName} with id ${ this.employee.id}?`)) {
        this.employeeService.deleteEmployee(this.employee.id)
          .subscribe(
            () => this.onSaveComplete(`${this.employee.firstName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  get isDirty(): boolean {
    return JSON.stringify(this.employee) !== JSON.stringify(this.employee);
  }

  onSaveComplete(message?: string): void {
    // Navigate back to the product list
    this.router.navigate(['/employee']);
  }
}
