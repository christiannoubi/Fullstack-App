import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  pageTitle = 'Employee List';
  employees: Employee [] = [];
  errorMessage = '';
  id: string;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
    });
  }

  addEmployee(): void {
    this.router.navigate([`/employee/add`]);
  }
}
