import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 userState$= this.FireAuth.authState;

  constructor(private FireAuth:AngularFireAuth) {}

  signIn(email:string,password:string){
  return this.FireAuth.signInWithEmailAndPassword(email,password);
  }
}
