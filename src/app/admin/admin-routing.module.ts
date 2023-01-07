import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path:'dashboard',component:DashboardComponent } ,
  {path: 'sector', loadChildren:()=>import('./sectors-table/sectors.module').then((m)=>m.SectorsModule),}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
