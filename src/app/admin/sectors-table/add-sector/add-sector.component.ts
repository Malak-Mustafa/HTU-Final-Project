import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.css']
})
export class AddSectorComponent {

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
  
}

}
