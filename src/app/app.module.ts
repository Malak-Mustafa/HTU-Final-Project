import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login-form/login-form.component';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SectorsTableComponent } from './admin/sectors-table/sectors-table.component';
import { StartupsTableComponent } from './admin/startups-table/startups-table.component';
import { RequestsCardComponent } from './admin/requests-card/requests-card.component';
import { AddSectorComponent } from './admin/sectors-table/add-sector/add-sector.component';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardComponent,
    SectorsTableComponent,
    StartupsTableComponent,
    RequestsCardComponent,
    AddSectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAAbpTma4mmz-imbM3uNQbMATf72adwrHY",
      authDomain: "capstonproject-772f0.firebaseapp.com",
      projectId: "capstonproject-772f0",
      storageBucket: "capstonproject-772f0.appspot.com",
      messagingSenderId: "536078032156",
      appId: "1:536078032156:web:8b541e8344ab7455b02ed9",
      measurementId: "G-Q6E4SRLH3R"
    }),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
