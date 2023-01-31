import { Component, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap,Observable } from 'rxjs';
import { sector } from '../shared/interfaces/sector';
import { FireStorageService } from '../shared/services/storege/fire-storage.service';
import { SectorsFirebaseServiceService } from '../shared/services/storege/sectors-firebase-service.service';
import { StartupFirebaseService } from '../shared/services/storege/startup-firebase.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { StartupDetailsComponent } from './startup-details/startup-details.component';
// import { ElementRef, ViewChild } from '@angular/core';

// declare var require: any;

// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  objectKeys = Object.keys;
  dataSource?:any;
  SectorsData?: any;
  showNav = true
  headerBg = false
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
  // @ViewChild('pdfTable')
  // pdfTable!: ElementRef;
  
  // public downloadAsPDF() {
  //   const pdfTable = this.pdfTable.nativeElement;
  //   console.log(pdfTable.innerHTML)
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).download(); 
     
  // }
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
    const dialogRef = this.dialog.open(StartupDetailsComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // ===========
  currentPosition = window.pageYOffset;
  @HostListener('window:scroll', ['$event.target']) // for window scroll events
  scroll(e: any) {
    let scroll = e.scrollingElement.scrollTop;
    // console.log("this is the scroll position", scroll)
    if (scroll > 100) {
      this.headerBg = true
    } else {
      this.headerBg = false
    }
    if (scroll > this.currentPosition) {
      // console.log("scrollDown");
      this.showNav = false
    } else {
      // console.log("scrollUp");
      this.showNav = true
    }
    this.currentPosition = scroll;
  }
}