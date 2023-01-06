import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectorsTableComponent } from './sectors-table/sectors-table.component';
import { StartupsTableComponent } from './startups-table/startups-table.component';
import { RequestsCardComponent } from './requests-card/requests-card.component';
import { AddSectorComponent } from './sectors-table/add-sector/add-sector.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    SectorsTableComponent,
    StartupsTableComponent,
    RequestsCardComponent,
    AddSectorComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
