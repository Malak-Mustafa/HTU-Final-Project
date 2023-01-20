import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap,Observable } from 'rxjs';
import { sector } from '../shared/interfaces/sector';
import { FireStorageService } from '../shared/services/storege/fire-storage.service';
import { SectorsFirebaseServiceService } from '../shared/services/storege/sectors-firebase-service.service';
import { StartupFirebaseService } from '../shared/services/storege/startup-firebase.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  objectKeys = Object.keys;
  dataSource?:any;
  SectorsData?: any;
  // SectorName?: string;
  constructor( private router: Router,
    private startupsService: StartupFirebaseService,
    private storage: FireStorageService,
    private sectorsService: SectorsFirebaseServiceService,
    public dialog: MatDialog
    ){
  }
  ngOnInit(): void {
    this.startupsService.getStartups().subscribe((response) => {
      if (response) {
        this.dataSource= response;
        this.getSectorsData(response)
      }
    });  
  }
  getSectorsData(data:any){
    this.SectorsData = {}
    for (let i = 0; i < data.length; i++) {
      // @ts-ignore: Unreachable code error
      this.SectorsData[data[i].SectorID] = ""
    }
    const IDs = Object.keys(this.SectorsData)
    for (const id in this.SectorsData) {
      this.sectorsService.getSector(id)
      .subscribe((response) => {
        if (response) {
          // @ts-ignore: Unreachable code error
          this.SectorsData[id] = {...response, startups:[]}
        }
        // run this on last element
        if (IDs[IDs.length-1] == id) {
          this.setData()
        }
      });
    }
  }
  setData(){
    for (let i = 0; i < this.dataSource.length; i++) {
      const startup = this.dataSource[i]
      this.SectorsData[startup.SectorID].startups.push(startup)
    }
  }
  openDialog(data:any): void {
    const dialogRef = this.dialog.open(StartupDialog, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

// =================
@Component({
  selector: 'startupDialog',
  templateUrl: 'startupDialog.html',
  styleUrls: ['./startupDialog.css']
})
export class StartupDialog {
  constructor(
    public dialogRef: MatDialogRef<StartupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}