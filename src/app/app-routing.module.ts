import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotLoggedInGuard } from './shared/guards/not-logged-in.guard';


const routes: Routes = [
  {path:'', component:HomePageComponent,pathMatch:'full'},
  {path: 'auth', loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule),
canActivate:[NotLoggedInGuard]},
  {path: 'admin', loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule),
  canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
