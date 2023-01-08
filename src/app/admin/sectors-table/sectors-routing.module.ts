import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSectorComponent } from './add-sector/add-sector.component';
import { UpdateSectorComponent } from './update-sector/update-sector.component';

const routes: Routes = [
  {path:'addSector',component:AddSectorComponent},
  {path:'updateSector',component:UpdateSectorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorsRoutingModule { }
