import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddSectorComponent } from './sectors-table/add-sector/add-sector.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent } ,
  {path:'addSector',component:AddSectorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
