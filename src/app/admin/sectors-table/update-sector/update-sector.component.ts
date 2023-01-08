import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';
@Component({
  selector: 'app-update-sector',
  templateUrl: './update-sector.component.html',
  styleUrls: ['./update-sector.component.css']
})
export class UpdateSectorComponent {
  updateSectorForm= new FormGroup({
    sectorName :new FormControl('',[Validators.required]),
    sectorLogo: new FormControl('',[Validators.required]),
    sectorDesignColor: new FormControl('',[Validators.required]),
  
  });
  
  get sectorName(){
    return this.updateSectorForm.get('sectorName')
  }
  get sectorLogo(){
    return this.updateSectorForm.get('sectorLogo')
  }
  get sectorDesignColor(){
    return this.updateSectorForm.get('sectorDesignColor')
  }

  onSubmit(){}
}
