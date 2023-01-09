import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FireStorageService } from 'src/app/shared/services/storege/fire-storage.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css'],
})
export class AddSectorComponent {
  downloadUrl? :string;
  path:string="sectors";
  constructor(
    private router: Router,
    private authService: AuthService,
    private sectorService: SectorsFirebaseServiceService,
    private storage: FireStorageService
  ) {}
  addSectorForm = new FormGroup({
    sectorName: new FormControl('', [Validators.required]),
    // sectorLogo: new FormControl('',[Validators.required]),
    sectorDesignColor: new FormControl('', [Validators.required]),
  });

  get sectorName() {
    return this.addSectorForm.get('sectorName');
  }
  // get sectorLogo(){
  //   return this.addSectorForm.get('sectorLogo')
  // }
  get sectorDesignColor() {
    return this.addSectorForm.get('sectorDesignColor');
  }
  onSubmit() {
    this.authService.userState$
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.sectorService.addSector({
              SectorName: this.sectorName?.value + '',
              sectorDesignColor: this.sectorDesignColor?.value + '',
              userId: value.uid,
              SectorLogo:this.downloadUrl+ '',
              
            });
          } else {
            return of(null);
          }
        })
      )
      .subscribe((val) => {
        if (!val) {
          alert('cannot add sector');
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
