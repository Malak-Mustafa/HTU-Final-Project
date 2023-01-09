import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { startup } from 'src/app/shared/interfaces/startup';
import { MatTableDataSource } from '@angular/material/table';
import { StartupFirebaseService } from 'src/app/shared/services/storege/startup-firebase.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
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
  dataSource = new MatTableDataSource<startup>();
  columnsToDisplay = [ 'id',
  'StartupName',];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,'Operations' ,'expand',];
  expandedElement:  null | undefined;
  constructor(
    private router: Router,
    private authService: AuthService,
    private startupService: StartupFirebaseService
  ) {}
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
        }
      });
  }


  editStartup() {
    console.log(this.dataSource);
  }
  deleteStartup() {
    console.log(this.dataSource);
  }
  addStartup() {
    console.log(this.dataSource);
    //this.router.navigate(['../addSector']);
  }
}


