import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent {
constructor(private router:Router,private authService: AuthService , private sectorService:SectorsFirebaseServiceService){}
addSectorForm= new FormGroup({
  sectorName :new FormControl('',[Validators.required]),
  sectorLogo: new FormControl('',[Validators.required]),
  sectorDesignColor: new FormControl('',[Validators.required]),

});

get sectorName(){
  return this.addSectorForm.get('sectorName')
}
get sectorLogo(){
  return this.addSectorForm.get('sectorLogo')
}
get sectorDesignColor(){
  return this.addSectorForm.get('sectorDesignColor')
}
onSubmit(){
  console.log(this.addSectorForm.value);

  this.authService.userState$
  .pipe(
      switchMap((value) => {
        console.log(value);
        
        if(value){
         return this.sectorService.addSector({
            SectorName:this.sectorName?.value+'',
            SectorLogo:this.sectorLogo?.value+'',
            sectorDesignColor:this.sectorDesignColor?.value+'',
            userId:value.uid,
          })
        }
          else {
            return of(null);
          }
      })
  ).subscribe((val)=> {
    if(!val){
      alert('cannot add sector');
    }
  })
  this.router.navigate(['/admin/dashboard']);
}

}
