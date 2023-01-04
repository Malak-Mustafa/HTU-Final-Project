import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { admin } from './admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = 'http://localhost:3000/admins';
  admins: admin[] = [];
  constructor(private http: HttpClient) {}

  getAdmins(): Observable<admin[]> {
    return this.http.get<admin[]>(this.baseUrl);
  }

  Auth(admin: admin) {
    //this.admins.push(admin);
    //console.log(this.admins);
    
  }
}
