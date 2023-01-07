import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private fb :FormBuilder, private auth:AuthService,private router: Router){}

  form =this.fb.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.minLength(8)]]
  })

  get email(){
    return this.form.get('email')
  }
  get password(){
    return this.form.get('password')
  }

  submit(){
   this.auth.signIn(
      this.email?.value+'',
      this.password?.value+''
    ).then((user)=> {
      console.log(user);
      //Navigate to admin
      this.router.navigate(['admin/dashboard']);
    }).catch((err)=> {
      console.log(err)
    });
  }
}
