import { Component, OnInit } from '@angular/core';
import {LoginService} from '../user/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private loginService: LoginService) { }

  ngOnInit() {
  }

  logout(): void {
    this.loginService.logout();
  }
}
