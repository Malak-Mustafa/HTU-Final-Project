import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStartupComponent } from './add-startup/add-startup.component';
import { UpdateStartupComponent } from './update-startup/update-startup.component';

const routes: Routes = [
  {path:'addStartup',component:AddStartupComponent},
  {path:'updateStartup',component:UpdateStartupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupsRoutingModule { }
