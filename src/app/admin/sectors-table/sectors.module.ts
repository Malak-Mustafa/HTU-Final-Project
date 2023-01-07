import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorsRoutingModule } from './sectors-routing.module';
import { AddSectorComponent } from './add-sector/add-sector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [AddSectorComponent],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SectorsModule { }
