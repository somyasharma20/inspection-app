import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BranchService } from 'app/Service/branch.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { formatDate, NgClass, DatePipe, NgIf, JsonPipe, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { DepartmentDialogComponent } from './dialogs/department-dialog/department-dialog.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-user-branch',
  standalone: true,
  templateUrl: './user-branch.component.html',
  styleUrl: './user-branch.component.scss',
  imports: [
    NgIf,
    BreadcrumbComponent,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatCheckboxModule,
    FeatherIconsComponent,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,
    DatePipe,
    JsonPipe,
    NgFor
  ],
})
export class UserBranchComponent
  extends UnsubscribeOnDestroyAdapter {
  userID: number = 0;
  lstBranch: any[] = [];

  breadscrums = [
    {
      title: 'Admin',
      items: ['User'],
      active: 'Manage User',
    },
  ];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public branchService: BranchService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userID = +params.get('id')!;
      this.fillBranch(this.userID);
    });
  }

  fillBranch(userID: number): void {
    this.branchService.GetAllBranchByUser(userID).subscribe(res => {
      console.log(res.data);
      this.lstBranch = res.data;
    });
  }

  back() {
    this.router.navigate(['admin/user/all-users']);
  }

  Edit(branchID: number) {
    debugger;
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      data: {
        userID: this.userID,
        branchID: branchID
      },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        // this.exampleDatabase?.dataChange.value.unshift(
        //   this.teachersService.getDialogData()
        // );
        this.fillBranch(this.userID);
        // this.showNotification(
        //   'snackbar-success',
        //   'Add Record Successfully...!!!',
        //   'top',
        //   'center'
        // );
      }
    });

  }

}
