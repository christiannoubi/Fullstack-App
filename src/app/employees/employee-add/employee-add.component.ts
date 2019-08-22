import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPassControl = c.get('confirmPassword');


  if (passwordControl.pristine || confirmPassControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmPassControl.value) {
    return null;
  }
  return {match: true};
}

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  pageTitle = 'Employee Add';
  errorMessage: string;
  currentEmployee: Employee;
  originalEmployee: Employee;
  employee: Employee;
  employeeForm: FormGroup;
  private id: string;
  emailMessage = '';
  passwordMessage = '';

  private emailValidationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  private passwordValidationMessages = {
    required: 'Please enter your password.',
    email: 'Please enter a valid password.'
  };

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
      firstName: ['', [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)]],
      lastName: ['', [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)]],
      username: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10)]],
        confirmPassword: ['', Validators.required],
      }, { validator: passwordMatcher }),
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher })
    });
    this.employeeService.getEmployee(this.id)
      .subscribe(employeeResp => {
        this.employee = employeeResp;
        this.employeeForm.patchValue({...employeeResp});
      });
    const emailControl = this.employeeForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessageEmail(emailControl)
    );
    const passwordControl = this.employeeForm.get('passwordGroup.password');
    passwordControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessagePassword(passwordControl)
    );
  }

  saveEmployee(): void {
    if (this.employee.id === 0) {
      const controlValue = this.employeeForm.value;
      console.log('controlValue', controlValue);
      this.employeeService.createEmployee({
        firstName: controlValue.firstName,
        lastName: controlValue.lastName,
        username: controlValue.username,
        password: controlValue.passwordGroup.password,
        email: controlValue.emailGroup.email
      })
        .subscribe(
          () => this.gotoList(`The new ${this.employee.firstName} was saved`),
          (error: any) => this.errorMessage = <any> error
        );
    }
  }

  setMessageEmail(c: AbstractControl): void {
    this.emailMessage = '';
    console.log(this.emailValidationMessages);
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.emailValidationMessages[key]).join(' ');
    }
  }

  setMessagePassword(c: AbstractControl): void {
    this.passwordMessage = '';
    console.log(this.passwordValidationMessages);
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(
        key => this.passwordValidationMessages[key]).join(' ');
    }
  }

  gotoList(message?: string): void {
    // Navigate back to the employee list
    this.router.navigate(['/employee']);
  }
}


