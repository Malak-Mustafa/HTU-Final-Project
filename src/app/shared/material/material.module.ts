import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
const Materials =[MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  MatButtonModule]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Materials
  ],
  exports:[
    Materials
  ]
})
export class MaterialModule { }
