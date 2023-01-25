import { Component , Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { sector } from 'src/app/shared/interfaces/sector';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FireStorageService } from 'src/app/shared/services/storege/fire-storage.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';
@Component({
  selector: 'app-update-sector',
  templateUrl: './update-sector.component.html',
  styleUrls: ['./update-sector.component.css']
})
export class UpdateSectorComponent implements OnInit {
  
  path:string="sectors";
  downloadUrl? :string;
  id = "";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private sectorService: SectorsFirebaseServiceService,
    private storage: FireStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result) => {
      console.log(result)
      if (result['id']) {
        this.id = result['id'];
        this.getById();
      }
    });

    
  }

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
        alert('sector updated');
      }
    });
  this.router.navigate(['/admin/dashboard']);
  }
getById(){
this.authService.userState$
          .pipe(
            switchMap((val) => {
              if (val) {
                return this.sectorService.getSector(this.id);
              } else {
                console.log( 'cannot get sector');
                
                return of(null);
              }
            })
          )
          .subscribe((response) => {
            if (response) {
              this.updateSectorForm.setValue({
                "sectorName": response.SectorName ,
                "sectorDesignColor":response.sectorDesignColor,
                
              })
             this.downloadUrl=response.SectorLogo
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
