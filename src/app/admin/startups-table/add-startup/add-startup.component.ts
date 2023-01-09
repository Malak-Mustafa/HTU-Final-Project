import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FireStorageService } from 'src/app/shared/services/storege/fire-storage.service';
import { StartupFirebaseService } from 'src/app/shared/services/storege/startup-firebase.service';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css']
})
export class AddStartupComponent {
  downloadUrl? :string;
  path:string="startups";
  constructor(
    private router: Router,
    private authService: AuthService,
    private startupsService: StartupFirebaseService,
    private storage: FireStorageService
  ) {}
  addStartupForm = new FormGroup({
    StartupName: new FormControl('', [Validators.required]),
    //StartupLogo: new FormControl(null,[Validators.required]),
    StartupCity: new FormControl('', [Validators.required]),
    Sector: new FormControl('', [Validators.required]),
    FounderName: new FormControl('',[Validators.required]),
    NumberOfEmployees: new FormControl('',[Validators.required]),
    YearOfEstablishment: new FormControl('',[Validators.required]),
    URL: new FormControl('',[Validators.required ]),
    EmailAddress: new FormControl('', [Validators.required , Validators.email]),
  });

  get StartupName() {
    return this.addStartupForm.get('StartupName');
  }
  // get StartupLogo(){
  //   return this.addStartupForm.get('StartupLogo')
  // }
  get StartupCity(){
    return this.addStartupForm.get('StartupCity')
  }
  get Sector() {
    return this.addStartupForm.get('Sectors');
  }
  get FounderName() {
    return this.addStartupForm.get('FounderName');
  }
  get NumberOfEmployees(){
    return this.addStartupForm.get('NumberOfEmployees')
  }
  get YearOfEstablishment() {
    return this.addStartupForm.get('YearOfEstablishment');
  }
  get EmailAddress() {
    return this.addStartupForm.get('EmailAddress');
  }
  get URL() {
    return this.addStartupForm.get('URL');
  }
  onSubmit() {
    this.authService.userState$
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.startupsService.addStartup({
              StartupName:this.StartupName?.value+'',
              userId: value.uid,
              StartupLogo:this.downloadUrl+ '',
              StartupCity: this.StartupCity?.value+ '',
              Sector: this.Sector?.value+ '',
              FounderName: this.FounderName?.value+ '',
              NumberOfEmployees: this.NumberOfEmployees!.value!,
              YearOfEstablishment: this.YearOfEstablishment!.value!,
              URL: this.URL?.value+ '',
              EmailAddress:  this.EmailAddress?.value+ '',
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
      });
    this.router.navigate(['/admin/dashboard']);
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
