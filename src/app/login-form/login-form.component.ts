import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { admin } from './admin';
import{ AdminService }from './admin.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(private AdminService:AdminService, private router:Router){

  }
 
  login(form:any){
    let admin: admin={
    email: form.value.email,
    password: form.value.password,
    
  };
  //this.AdminService.Auth(admin);
  this.router.navigate(['dashboard/']);
  }
}
