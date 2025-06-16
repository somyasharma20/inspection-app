import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/Service/user.service';
import { LocalStorageService } from 'app/Service/local-storage.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  standalone: true,
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
export class AllUsersComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    //'branch',
    'mobileNo',
    'isActive',
    'actions',
  ];
  
  dataSourceUser = new MatTableDataSource<any>([]);

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
    public userService: UserService,
    private snackBar: MatSnackBar,
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

    if (userTypeID != "1") {
      this.router.navigate(['/admin/un-auth']);
    }
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        //user: this.user,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
        this.loadData();
        // this.showNotification(
        //  'snackbar-success',
        //  'Add Record Successfully...!!!',
        //  'top',
        //  'center'
        //);
      }
    });
  }

  Edit(lst: any) {
    debugger;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        user: lst,
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
        this.loadData();
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


  public loadData() {
    debugger;
    this.userService.GetAllUser().subscribe(res => {
      //console.log(res.data);
      this.dataSourceUser = new MatTableDataSource<any>(res.data);
      this.dataSourceUser.paginator = this.paginator;
    });
  }

  showBranch(userID: number) {
    this.router.navigate(['/admin/user/user-branch/' + userID]);
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
  // context menu
  // onContextMenu(event: MouseEvent, item: User) {
  //   event.preventDefault();
  //   this.contextMenuPosition.x = event.clientX + 'px';
  //   this.contextMenuPosition.y = event.clientY + 'px';
  //   if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
  //     this.contextMenu.menuData = { item: item };
  //     this.contextMenu.menu.focusFirstItem('mouse');
  //     this.contextMenu.openMenu();
  //   }
  // }
}

