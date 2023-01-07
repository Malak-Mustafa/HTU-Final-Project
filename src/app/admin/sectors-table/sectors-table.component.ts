import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { sector } from 'src/app/shared/interfaces/sector';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';

@Component({
  selector: 'app-sectors-table',
  templateUrl: './sectors-table.component.html',
  styleUrls: ['./sectors-table.component.css']
})
export class SectorsTableComponent implements OnInit {
  constructor(private router:Router, private authService:AuthService, private sectorsService:SectorsFirebaseServiceService){}
  displayedColumns: string[] = ['id', 'SectorName', 'SectorLogo', 'DesignColor' , 'Operations'];
  dataSource = new MatTableDataSource<sector>;

  

  ngOnInit(): void{
    this.authService.userState$
      .pipe(
        switchMap( (val) => {

          if(val){
            return this.sectorsService.getSectors(); 
        }
        else {
          return of(null);
        }
    }),

    ).subscribe((response)=> {
      if(response){
        this.dataSource.data = response;
      }
    })
  }

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
