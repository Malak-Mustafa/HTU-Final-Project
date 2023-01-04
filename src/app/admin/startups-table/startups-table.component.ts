import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-startups-table',
  templateUrl: './startups-table.component.html',
  styleUrls: ['./startups-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StartupsTableComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = [ 'id',
  'StartupName',];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,'Operations' ,'expand',];
  expandedElement: PeriodicElement | null | undefined;

  editStartup() {
    console.log(this.dataSource);
  }
  deleteStartup() {
    console.log(this.dataSource);
  }
  addStartup() {
    console.log(this.dataSource);
  }
}
export interface PeriodicElement {
  StartupName: string;
  id?: number;
  StartupLogo: string;
  StartupCity: string;
  Sectors: string;
  FounderName: string;
  NumberOfEmployees: number;
  YearOfEstablishment: number;
  URL: string;
  EmailAddress: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    StartupName: 'test',
    StartupLogo:
      'https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/4a14e7b2de7f6eaf5a6c98cb8c00b8de.png',
    StartupCity: 'Amman',
    Sectors: 'IT',
    FounderName: 'abood',
    NumberOfEmployees: 100,
    YearOfEstablishment: 2000,
    URL: 'https//abood',
    EmailAddress: 'abood@abood',
  }, {
    id: 2,
    StartupName: 'test2',
    StartupLogo:
      'https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/4a14e7b2de7f6eaf5a6c98cb8c00b8de.png',
    StartupCity: 'Amman',
    Sectors: 'IT',
    FounderName: 'abood',
    NumberOfEmployees: 100,
    YearOfEstablishment: 2000,
    URL: 'https//abood',
    EmailAddress: 'abood@abood',
  },
];
