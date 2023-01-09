import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupsRoutingModule } from './startups-routing.module';
import { AddStartupComponent } from './add-startup/add-startup.component';


@NgModule({
  declarations: [
    AddStartupComponent
  ],
  imports: [
    CommonModule,
    StartupsRoutingModule
  ]
})
export class StartupsModule { }
