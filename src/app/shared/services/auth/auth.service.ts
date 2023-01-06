import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private FireAuth:AngularFireAuth) { }

  signIn(email:string,password:string){
  return this.FireAuth.signInWithEmailAndPassword(email,password);
  }
}
