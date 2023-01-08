import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorsRoutingModule } from './sectors-routing.module';
import { AddSectorComponent } from './add-sector/add-sector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UpdateSectorComponent } from './update-sector/update-sector.component';

@NgModule({
  declarations: [AddSectorComponent, UpdateSectorComponent],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SectorsModule { }
