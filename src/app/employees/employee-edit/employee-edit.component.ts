import {Component, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  pageTitle = 'Employee Edit';
  errorMessage: string;
  currentEmployee: Employee;
  originalEmployee: Employee;
  employee: Employee;


  employeeForm: FormGroup;
  private id: string;

  get isDirty(): boolean {
    return JSON.stringify(this.originalEmployee) !== JSON.stringify(this.currentEmployee);
  }

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
    this.id =  this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [],
      firstName: ['', [Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(10)]],
      lastName: ['', [Validators.required,
                      Validators.minLength(5),
                      Validators.maxLength(15)]],
      username: ['', [Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(10)]],
      password: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(10)]],
      email: ['',    [Validators.required,
                      Validators.email]]
    });

    this.employeeService.getEmployee(this.id)
      .subscribe(employeeResp => {
        this.employee = employeeResp;
        this.employeeForm.patchValue({...employeeResp});
      });
  }

  /*gotoEmployee(employee: Employee): void {
    this.employee = employee;

    if (!this.employee) {
      this.pageTitle = 'No product found';
    } else {
      if (this.employee.id === 0) {
        this.pageTitle = 'Add Employee';
      } else {
        this.pageTitle = `Edit Employee: ${this.employee.firstName}`;
      }
    }
  }*/

  deleteEmployee(): void {
    if (this.employee.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.employee.firstName} was deleted`);
    } else {
      if (confirm(`Really delete this employee: ${this.employee.firstName} with id ${ this.employee.id}?`)) {
        this.employeeService.deleteEmployee(this.employee.id)
          .subscribe(
            () => this.onSaveComplete(`${this.employee.firstName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  gotoDetailEmployee(): void {
    this.router.navigate([`/employee/${this.employee.id}`]);
  }

  updateEmployee(): void {
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employeeForm.value)
        .subscribe(
          () => this.onSaveComplete(`The updated ${this.employee.firstName} was saved`),
          (error: any) => this.errorMessage = <any> error
        );
    }
  }

  onSaveComplete(message?: string): void {
    // Navigate back to the employee list
    this.router.navigate(['/employee']);
  }
}

