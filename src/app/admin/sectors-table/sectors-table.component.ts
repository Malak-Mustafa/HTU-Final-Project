import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sectors-table',
  templateUrl: './sectors-table.component.html',
  styleUrls: ['./sectors-table.component.css']
})
export class SectorsTableComponent {
  constructor(private router:Router){}
  displayedColumns: string[] = ['id', 'SectorName', 'SectorLogo', 'DesignColor' , 'Operations'];
  dataSource = ELEMENT_DATA;
  editSector(){
    console.log(this.dataSource);
  }
  deleteSector(){
    console.log(this.dataSource);
  }
  addSector(){
    console.log(this.dataSource);
    this.router.navigate(['../addSector']);

  }
}
export interface PeriodicElement {
  SectorName: string;
  id: number;
  SectorLogo: string;
  DesignColor: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1,
     SectorName: 'test',
      SectorLogo: "https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/4a14e7b2de7f6eaf5a6c98cb8c00b8de.png",
       DesignColor: '#FF6E6D',
      },

];

/**
 * @title Basic use of `<table mat-table>`
 */
