import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FireStorageService } from 'src/app/shared/services/storege/fire-storage.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';
import { StartupFirebaseService } from 'src/app/shared/services/storege/startup-firebase.service';

@Component({
  selector: 'app-update-startup',
  templateUrl: './update-startup.component.html',
  styleUrls: ['./update-startup.component.css']
})
export class UpdateStartupComponent implements OnInit {
  path:string="sector";
  downloadUrl? :string;
  id = "";
  sectors?: Array <any>;
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private startupsService: StartupFirebaseService,
    private storage: FireStorageService,
    private sectorsService: SectorsFirebaseServiceService
  ) {}

  ngOnInit(): void {

    this.authService.userState$
    .pipe(
      switchMap((val) => {
        if (val) {
          return this.sectorsService.getSectors();
        } else {
          return of(null);
        }
      })
    )
    .subscribe((response) => {
      if (response) {
          this.sectors=response;         
      }
    });

    this.activatedRoute.queryParams.subscribe((result) => {
      console.log(result)
      if (result['id']) {
        this.id = result['id'];
        this.getById();
      }
    });
  }

  UpdateStartupForm = new FormGroup({
    StartupName: new FormControl('', [Validators.required]),
    //StartupLogo: new FormControl(null,[Validators.required]),
    StartupCity: new FormControl('', [Validators.required]),
    SectorID: new FormControl('', [Validators.required]),
    FounderName: new FormControl('',[Validators.required]),
    NumberOfEmployees: new FormControl('',[Validators.required]),
    YearOfEstablishment: new FormControl('',[Validators.required]),
    URL: new FormControl('',[Validators.required ]),
    EmailAddress: new FormControl('', [Validators.required , Validators.email]),
  });

  get StartupName() {
    return this.UpdateStartupForm.get('StartupName');
  }
  // get StartupLogo(){
  //   return this.UpdateStartupForm.get('StartupLogo')
  // }
  get StartupCity(){
    return this.UpdateStartupForm.get('StartupCity')
  }
  get SectorID() {
    return this.UpdateStartupForm.get('SectorID');
  }
  get FounderName() {
    return this.UpdateStartupForm.get('FounderName');
  }
  get NumberOfEmployees(){
    return this.UpdateStartupForm.get('NumberOfEmployees')
  }
  get YearOfEstablishment() {
    return this.UpdateStartupForm.get('YearOfEstablishment');
  }
  get EmailAddress() {
    return this.UpdateStartupForm.get('EmailAddress');
  }
  get URL() {
    return this.UpdateStartupForm.get('URL');
  }
onSubmit(){
  if(confirm("are you sure to update startup?")){
      this.updateStartup(this.id)
   }
   else{alert('update canceled')
   this.router.navigate(['/admin/dashboard']);
  }

}
  updateStartup(id:string){
    this.authService.userState$
    .pipe(
      switchMap((value) => {
        if (value) {
          return this.startupsService.updateStartup(id,{
            StartupName:this.StartupName?.value+'',
            userId: value.uid,
            StartupLogo:this.downloadUrl+ '',
            StartupCity: this.StartupCity?.value+ '',
            SectorID: this.SectorID?.value+ '',
            FounderName: this.FounderName?.value+ '',
            NumberOfEmployees: this.NumberOfEmployees!.value!,
            YearOfEstablishment: this.YearOfEstablishment!.value!,
            URL: this.URL?.value+ '',
            EmailAddress:  this.EmailAddress?.value+ '',
          })
        } else {
          return of(null);
        }
      })
    )
    .subscribe((val) => {
      if (!val) {
        alert('startup updated');
      }
    });
  this.router.navigate(['/admin/dashboard']);
  }


  getById(){
    this.authService.userState$
              .pipe(
                switchMap((val) => {
                  if (val) {
                    return this.startupsService.getStartup(this.id);
                  } else {
                    console.log( 'cannot get sector');
                    
                    return of(null);
                  }
                })
              )
              .subscribe((response) => {
                if (response) {
                  this.UpdateStartupForm.setValue({
                    "StartupName": response.StartupName,
                    "StartupCity": response.StartupCity,
                    "SectorID": response.SectorID,
                    "FounderName": response.FounderName,
                    "NumberOfEmployees": response.NumberOfEmployees,
                    "YearOfEstablishment": response.YearOfEstablishment,
                    "URL": response.URL,
                    "EmailAddress": response.EmailAddress,
                  })
                 this.downloadUrl=response.StartupLogo
                }
              });
    }

  upload(event: Event) {
    console.log(event);
    let file = (event.target as HTMLInputElement)?.files?.[0];
    if(file){
      this.storage.uploadFile(file,this.path).subscribe((val)=>{
        this.downloadUrl=val;
        
      })
    }
    
  }
}
