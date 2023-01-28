import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
constructor(public authService :AuthService,private router: Router){}
logout(){
  this.authService.signOut().then(() => this.router.navigate(['/auth/login']));
}
}

