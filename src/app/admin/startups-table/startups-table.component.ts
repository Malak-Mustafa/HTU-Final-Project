import { Component, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { startup } from 'src/app/shared/interfaces/startup';
import { MatTableDataSource } from '@angular/material/table';
import { StartupFirebaseService } from 'src/app/shared/services/storege/startup-firebase.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { SectorsFirebaseServiceService } from 'src/app/shared/services/storege/sectors-firebase-service.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-startups-table',
  templateUrl: './startups-table.component.html',
  styleUrls: ['./startups-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class StartupsTableComponent {
  dataSource = new MatTableDataSource<startup>();
  SectorsData?: any;
  SectorName?: string;
  columnsToDisplay = [ 'StartupName'];
  columnsToDisplayWithExpand = [
    ...this.columnsToDisplay,
    'Operations',
    'expand',
  ];
  expandedElement!:startup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private authService: AuthService,
    private startupService: StartupFirebaseService,
    private sectorsService: SectorsFirebaseServiceService
  ) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.authService.userState$
      .pipe(
        switchMap((val) => {
          if (val) {
            return this.startupService.getStartups();
          } else {
            return of(null);
          }
        })
      )
      .subscribe((response) => {
        if (response) {
          this.dataSource.data = response;
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
    for (const id in this.SectorsData) {
      this.authService.userState$
        .pipe(
          switchMap((val) => {
            if (val) {
              return this.sectorsService.getSector(id);
            } else {
              console.log( 'cannot get sector');
              
              return of(null);
            }
          })
        )
        .subscribe((response) => {
          if (response) {
            // @ts-ignore: Unreachable code error
            this.SectorsData[id] = response.SectorName
          }
        });
    }
  }

  editStartup() {
    console.log(this.dataSource);
  }
  deleteStartup(id: string) {
    //console.log(this.dataSource);
    if(confirm("are you sure to delete startup?")){
      this.authService.userState$
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.startupService.deleteStartup(id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((val) => {
        if (!val) {
          alert('startup deleted!');
        }
      });
     }
     else{alert('delete startup canceled')
    }

    
  }
  addStartup() {
    console.log(this.dataSource);
    //this.router.navigate(['../addSector']);
  }
}
