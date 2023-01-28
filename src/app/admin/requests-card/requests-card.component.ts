import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { request } from 'src/app/shared/interfaces/request';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { RequestsFirebaseService } from 'src/app/shared/services/storege/requests-firebase.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';
import { StartupFirebaseService } from 'src/app/shared/services/storege/startup-firebase.service';
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
private requestsService: RequestsFirebaseService,
private startupsService: StartupFirebaseService,
private router: Router,
){}
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
        //console.log(this.requests);
        
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
addStartup(id:string){
  
    for (let i = 0; i < this.requests!.length; i++) {
    // console.log(this.requests![i]);
    if(this.requests![i].id===id){
      if(confirm("are you sure to update sector?")){
        this.authService.userState$
    .pipe(
      switchMap((value) => {
        if (value) {
          return this.startupsService.addStartup({
            StartupName:this.requests![i].StartupName!,
            userId: value.uid,
            StartupLogo:this.requests![i].StartupLogo,
            StartupCity: this.requests![i].StartupCity,
            SectorID: this.requests![i].SectorID,
            FounderName:this.requests![i].FounderName,
            NumberOfEmployees:this.requests![i].NumberOfEmployees!,
            YearOfEstablishment:this.requests![i].YearOfEstablishment,
            URL: this.requests![i].URL,
            EmailAddress:this.requests![i].EmailAddress,
          });
        } else {
          return of(null);
        }
      })
    )
    .subscribe((val) => {
      if (!val) {
        alert('cannot add startup');
      }
      else{
        alert('request accepted');
        // this.deleteRequest(this.requests![i].id!)
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
          console.log('request accepted');
          
        }
      });
      } 
    });
  this.router.navigate(['/admin/dashboard']);
  }
  else{alert('update canceled')
       this.router.navigate(['/admin/dashboard']);
      }
       }
  }
}
  

deleteRequest(id:string){
  if(confirm("are you sure to delete request?")){
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
   else{alert('request not deleted!')
  }

  
}
}
 

