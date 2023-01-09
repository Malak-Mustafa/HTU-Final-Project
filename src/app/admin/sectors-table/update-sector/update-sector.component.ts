import { Component , Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { sector } from 'src/app/shared/interfaces/sector';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FireStorageService } from 'src/app/shared/services/storege/fire-storage.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';
@Component({
  selector: 'app-update-sector',
  templateUrl: './update-sector.component.html',
  styleUrls: ['./update-sector.component.css']
})
export class UpdateSectorComponent {
  @Input() id='';
  path:string="sector";
  downloadUrl? :string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private sectorService: SectorsFirebaseServiceService,
    private storage: FireStorageService
  ) {}

  updateSectorForm= new FormGroup({
    sectorName :new FormControl('',[Validators.required]),
    //sectorLogo: new FormControl('',[Validators.required]),
    sectorDesignColor: new FormControl('',[Validators.required]),
  
  });
  
  get sectorName(){
    return this.updateSectorForm.get('sectorName')
  }
  // get sectorLogo(){
  //   return this.updateSectorForm.get('sectorLogo')
  // }
  get sectorDesignColor(){
    return this.updateSectorForm.get('sectorDesignColor')
  }

  onSubmit() {
    this.updateSector(this.id)
  }
  updateSector(id:string){
    this.authService.userState$
    .pipe(
      switchMap((value) => {
        if (value) {
          return this.sectorService.updateSector(id,{
            SectorName: this.sectorName?.value + '' ,
            sectorDesignColor: this.sectorDesignColor?.value + '',
            SectorLogo: this.downloadUrl + '',
            userId: value.uid
          })
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
