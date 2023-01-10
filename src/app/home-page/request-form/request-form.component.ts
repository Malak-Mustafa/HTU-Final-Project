import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FireStorageService } from 'src/app/shared/services/storege/fire-storage.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';
import { RequestsFirebaseService } from 'src/app/shared/services/storege/requests-firebase.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent {
  sectors?: Array <any>;
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
  }
  downloadUrl? :string;
  path:string="requests";
  constructor(
    private router: Router,
    private authService: AuthService,
    private requestsService: RequestsFirebaseService,
    private storage: FireStorageService,
    private sectorsService: SectorsFirebaseServiceService
  ) {}
  requestForm = new FormGroup({
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
    return this.requestForm.get('StartupName');
  }
  // get StartupLogo(){
  //   return this.requestForm.get('StartupLogo')
  // }
  get StartupCity(){
    return this.requestForm.get('StartupCity')
  }
  get SectorID() {
    return this.requestForm.get('SectorID');
  }
  get FounderName() {
    return this.requestForm.get('FounderName');
  }
  get NumberOfEmployees(){
    return this.requestForm.get('NumberOfEmployees')
  }
  get YearOfEstablishment() {
    return this.requestForm.get('YearOfEstablishment');
  }
  get EmailAddress() {
    return this.requestForm.get('EmailAddress');
  }
  get URL() {
    return this.requestForm.get('URL');
  }
  onSubmit() {
    this.authService.userState$
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.requestsService.addRequest({
              StartupName:this.StartupName?.value+'',
              StartupLogo:this.downloadUrl+ '',
              StartupCity: this.StartupCity?.value+ '',
              SectorID: this.SectorID?.value+ '',
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
