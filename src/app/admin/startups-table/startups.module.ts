import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupsRoutingModule } from './startups-routing.module';
import { AddStartupComponent } from './add-startup/add-startup.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddStartupComponent
  ],
  imports: [
    CommonModule,
    StartupsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class StartupsModule { }
