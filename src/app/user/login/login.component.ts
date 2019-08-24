import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  pageTitle = 'Log In';

  submitted = false;
  loading = false;


  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private loginService: LoginService
              ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]],
      password: ['', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10)]]
    });
  }



  login(): void {
    this.loading = true;
    this.loginService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          console.log('ddsfsfgsfgfgsfgsfgfsg');
          this.router.navigate(['/home']);
        },
        error => {
          this.loading = false;
        });
  }

  get f() {
    return this.loginForm.controls;
  }


  registration(): void {
    this.router.navigate(['registration']);
  }
}
