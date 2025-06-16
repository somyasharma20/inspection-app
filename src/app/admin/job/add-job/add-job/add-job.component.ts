import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { TeachersService } from './teachers.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
//import { Teachers } from './teachers.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
//import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import {
  formatDate,
  NgClass,
  DatePipe,
  NgIf,
  JsonPipe,
  NgFor,
} from '@angular/common';
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
//import { DeleteDialogComponent } from 'app/admin/teachers/all-teachers/dialogs/delete/delete.component';

import { FormDialogComponent } from '../../dialogs/form-dialog/form-dialog.component';
//import { JobService } from 'app/Service/job.service';

import { CustomerService } from 'app/Service/customer.service';
import { CategoryService } from 'app/Service/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { JobService } from 'app/Service/job.service';
import { LocalStorageService } from 'app/Service/local-storage.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],

  standalone: true,
  imports: [
    NgIf,
    BreadcrumbComponent,
    MatTabsModule,
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
    NgFor,
  ],
})
export class AddJobComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'jobNo',
    'jobDate',
    'customerName',
    'active',
    'actions',
  ];
  public APIURL = environment.APIURL;
  lstData: any = [];
  dataSourceStyle = new MatTableDataSource<any>(this.lstData);

  breadscrums = [
    {
      title: 'Admin',
      items: ['Job'],
      active: 'Manage Job',
    },
  ];
  userType = 0;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _jobService: JobService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _LocalStorage: LocalStorageService,
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    let userTypeID = this._LocalStorage.getValueOnLocalStorage('userTypeID');
    this.userType = Number(this._LocalStorage.getValueOnLocalStorage('userTypeID'));

    if (userTypeID != "1" && userTypeID != "2" && userTypeID != "4") {
      this.router.navigate(['/admin/un-auth']);
    }
    this.loadStyle();
  }
  refresh() {
    //this.loadData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceStyle.filter = filterValue.trim().toLowerCase();
  }

  GotoJobDetail(lst: any) {
    this.router.navigate(['/admin/job/add-jobdetail', lst.jobID]);
  }
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        action: 'add',
      },
      //direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
        this.loadStyle();
      }
    });
  }

  Edit(lst: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        style: lst,
        action: 'edit',
      },
      //direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        // this.exampleDatabase?.dataChange.value.unshift(
        //   this.teachersService.getDialogData()
        // );
        this.refreshTable();
        this.loadStyle();
        // this.showNotification(
        //   'snackbar-success',
        //   'Add Record Successfully...!!!',
        //   'top',
        //   'center'
        // );
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.renderedData.length;
    // return numSelected === numRows;
  }

  public loadStyle() {
    this._jobService.GetAllJob().subscribe((res) => {
      this.lstData = res.data;
      this.dataSourceStyle = new MatTableDataSource<any>(res.data);
      this.dataSourceStyle.sort = this.sort;
      this.dataSourceStyle.paginator = this.paginator;
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  ShowDepartmentSam(lst: any) {
    // const dialogRef = this.dialog.open(null, {
    //   data: {
    //     style: lst,
    //     action: 'edit',
    //   },
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     this.refreshTable();
    //     this.loadStyle();
    //   }
    // });
  }
}
