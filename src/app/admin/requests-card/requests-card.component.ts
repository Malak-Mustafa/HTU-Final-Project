import { Component } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { of, switchMap } from 'rxjs';
import { request } from 'src/app/shared/interfaces/request';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { RequestsFirebaseService } from 'src/app/shared/services/storege/requests-firebase.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';
@Component({
  selector: 'app-requests-card',
  templateUrl: './requests-card.component.html',
  styleUrls: ['./requests-card.component.css'],
  
})

export class RequestsCardComponent {
  requests?: request[] 
  SectorsData?: any;
  SectorName?: string;
constructor(private authService: AuthService, 
private sectorsService: SectorsFirebaseServiceService,
private requestsService: RequestsFirebaseService,){}
ngOnInit(): void {
  this.authService.userState$
    .pipe(
      switchMap((val) => {
        if (val) {
          return this.requestsService.getRequests();
        } else {
          return of(null);
        }
      })
    )
    .subscribe((response) => {
      if (response) {
        this.requests = response;
        this.getSectorsData(response)
        console.log(this.requests);
        
      }
    });
}


getSectorsData(data:any){
  this.SectorsData = {}
  for (let i = 0; i < data.length; i++) {
    // @ts-ignore: Unreachable code error
    this.SectorsData[data[i].SectorID] = ""
  }
  for (const id in this.SectorsData) {
    this.authService.userState$
      .pipe(
        switchMap((val) => {
          if (val) {
            return this.sectorsService.getSector(id);
          } else {
            console.log( 'cannot get sector');
            
            return of(null);
          }
        })
      )
      .subscribe((response) => {
        if (response) {
          // @ts-ignore: Unreachable code error
          this.SectorsData[id] = response.SectorName
        }
      });
  }
}
addStartup(){
  console.log("add");
  
}
deleteRequest(id:string){
  this.authService.userState$
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.requestsService.deleteRequest(id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((val) => {
        if (!val) {
          alert('request deleted!');
        }
      });
  
}
}
 

