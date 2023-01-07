import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RequestsCardComponent } from './admin/requests-card/requests-card.component';
import { AddSectorComponent } from './admin/sectors-table/add-sector/add-sector.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  // {path:'login',component:LoginFormComponent},
  // {path:'dashboard',component:DashboardComponent } ,
  // {path:'addSector',component:AddSectorComponent},
  {path:'', component:HomePageComponent,pathMatch:'full'},
  {path: 'auth', loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule)},
  {path: 'admin', loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule),
  canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
