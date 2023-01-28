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
  styleUrls: ['./sectors-table.component.css'],
})
export class SectorsTableComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private sectorsService: SectorsFirebaseServiceService
  ) {}
  displayedColumns: string[] = [
    'SectorName',
    'SectorLogo',
    'DesignColor',
    'Operations',
  ];
  dataSource = new MatTableDataSource<sector>();

  ngOnInit(): void {
    this.authService.userState$
      .pipe(
        switchMap((val) => {
          if (val) {
            return this.sectorsService.getSectors();
          } else {
            return of(null);
          }
        })
      )
      .subscribe((response) => {
        if (response) {
          this.dataSource.data = response;
        }
      });
  }

  updateSector(id: string) {
    console.log(this.dataSource);
  
  }
  deleteSector(id: string) {
    console.log(this.dataSource);
    if(confirm("are you sure to delete sector?")){
      this.authService.userState$
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.sectorsService.deleteSector(id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((val) => {
        if (!val) {
          alert('sector deleted!');
        }
      });
     }
     else{alert('delete sector canceled')
    }
    
  }
  addSector() {
    console.log(this.dataSource);
    //this.router.navigate(['../addSector']);
  }
}
