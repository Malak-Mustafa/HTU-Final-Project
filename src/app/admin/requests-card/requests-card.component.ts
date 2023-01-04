import { Component } from '@angular/core';
@Component({
  selector: 'app-requests-card',
  templateUrl: './requests-card.component.html',
  styleUrls: ['./requests-card.component.css'],
  
})

export class RequestsCardComponent {
  requests: requestInfo[] = [
    {
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
constructor(){}
addStartup(){
  console.log("add");
  
}
deleteRequest(){
  console.log("delete");
  
}
}
 export interface requestInfo{
  StartupName: string;
  StartupLogo: string;
  StartupCity: string;
  Sectors: string;
  FounderName: string;
  NumberOfEmployees: number;
  YearOfEstablishment: number;
  URL: string;
  EmailAddress: string;
 }
  

