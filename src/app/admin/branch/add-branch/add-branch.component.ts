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
//import { TeachersService } from 'app/admin/teachers/all-teachers/teachers.service';
//import { Teachers } from 'app/admin/teachers/all-teachers/teachers.model';
//import { FormDialogComponent } from 'app/admin/teachers/all-teachers/dialogs/form-dialog/form-dialog.component';
//import { DeleteDialogComponent } from 'app/admin/teachers/all-teachers/dialogs/delete/delete.component';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { DepartmentDialogComponent } from '../dialogs/department-dialog/department-dialog.component';
import { BranchService } from 'app/Service/branch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'app/Service/local-storage.service';
import { Router } from '@angular/router';
//import { FormDialogComponent } from 'app/teacher/lectures/dialogs/form-dialog/form-dialog.component';
//import { DeleteDialogComponent } from 'app/teacher/lectures/dialogs/delete/delete.component';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss'],
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
    NgFor
  ],
})
export class AddBranchComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'name',
    'phone',
    'city',
    'state',
    'zipcode',
    'country',
    'active',
    'actions',
  ];

  // displayedColumns = [
  //   'name',

  // ];
  //exampleDatabase?: TeachersService;
  //dataSource!: ExampleDataSource;
  //BranchForm: FormGroup;
  lstData: any = [];
  dataSourcebranch = new MatTableDataSource<any>(this.lstData);

  // selection = new SelectionModel<Teachers>(true, []);
  // id?: number;
  // teachers?: Teachers;
  breadscrums = [
    {
      title: 'Admin',
      items: ['Center'],  
      active: 'Manage Center',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    //public teachersService: TeachersService,
    private snackBar: MatSnackBar,
    private _branchservice: BranchService,
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    private router: Router,
  ) {
    super();
    // this.BranchForm = this.formBuilder.group({
    //   BranchID: [0],
    //   mainCategoryID: [0, Validators.required],
    //   categoryName: ['', Validators.required],
    //   description: [''],
    //   active: [false],
    //   //createdBy: Number(this.LoggedInUserId)
    // });
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
    //this.loadData();
    this.loadBranch();

  }
  refresh() {
    //this.loadData();
  }
  addNew() {
    // let tempDirection: Direction;
    // if (localStorage.getItem('isRtl') === 'true') {
    //   tempDirection = 'rtl';
    // } else {
    //   tempDirection = 'ltr';
    // }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        //teachers: this.teachers,
        action: 'add',
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
        this.loadBranch();
        // this.showNotification(
        //   'snackbar-success',
        //   'Add Record Successfully...!!!',
        //   'top',
        //   'center'
        // );
      }
    });
  }

  Edit(lst: any) {
    debugger;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        branch: lst,
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
        this.loadBranch();
        // this.showNotification(
        //   'snackbar-success',
        //   'Add Record Successfully...!!!',
        //   'top',
        //   'center'
        // );
      }
    });

  }

  ShowDepartment(lst: any) {
    debugger;
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      data: {
        branchID: lst.branchID,
      },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        //this.refreshTable();
        //this.loadBranch();
      }
    });
  }

  // editCall(row: Teachers) {
  //   this.id = row.id;
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       teachers: row,
  //       action: 'edit',
  //     },
  //     direction: tempDirection,
  //   });
  // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //   if (result === 1) {
  //     // When using an edit things are little different, firstly we find record inside DataService by id
  //     const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
  //       (x) => x.id === this.id
  //     );
  //     // Then you update that record using data from dialogData (values you enetered)
  //     if (foundIndex != null && this.exampleDatabase) {
  //       this.exampleDatabase.dataChange.value[foundIndex] =
  //         this.teachersService.getDialogData();
  //       // And lastly refresh table
  //       this.refreshTable();
  //       this.showNotification(
  //         'black',
  //         'Edit Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   }
  // });
  //}
  // deleteItem(row: Teachers) {
  //   this.id = row.id;
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: row,
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 1) {
  //       const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
  //         (x) => x.id === this.id
  //       );
  //       // for delete we use splice in order to remove single object from DataService
  //       if (foundIndex != null && this.exampleDatabase) {
  //         this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //         this.refreshTable();
  //         this.showNotification(
  //           'snackbar-danger',
  //           'Delete Record Successfully...!!!',
  //           'bottom',
  //           'center'
  //         );
  //       }
  //     }
  //   });
  // }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.renderedData.length;
    // return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.renderedData.forEach((row) =>
  //       this.selection.select(row)
  //     );
  // }
  // removeSelectedRows() {
  //   const totalSelect = this.selection.selected.length;
  //   this.selection.selected.forEach((item) => {
  //     const index: number = this.dataSource.renderedData.findIndex(
  //       (d) => d === item
  //     );
  //     // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
  //     this.exampleDatabase?.dataChange.value.splice(index, 1);
  //     this.refreshTable();
  //     this.selection = new SelectionModel<Teachers>(true, []);
  //   });
  //   this.showNotification(
  //     'snackbar-danger',
  //     totalSelect + ' Record Delete Successfully...!!!',
  //     'bottom',
  //     'center'
  //   );
  // }

  public loadBranch() {
    debugger;
    this._branchservice.GetAllBranch().subscribe(res => {
      console.log(res.data);
      this.lstData = res.data
      this.dataSourcebranch = new MatTableDataSource<any>(res.data);
      this.dataSourcebranch.paginator = this.paginator;
    });
  }

  // public loadData() {
  //   this.exampleDatabase = new TeachersService(this.httpClient);
  //   this.dataSource = new ExampleDataSource(
  //     this.exampleDatabase,
  //     this.paginator,
  //     this.sort
  //   );
  //   this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
  //     () => {
  //       if (!this.dataSource) {
  //         return;
  //       }
  //       this.dataSource.filter = this.filter.nativeElement.value;
  //     }
  //   );
  // }
  // export table data in excel file
  // exportExcel() {
  //   // key name with space add in brackets
  //   const exportData: Partial<TableElement>[] =
  //     this.dataSource.filteredData.map((x) => ({
  //       Name: x.name,
  //       Department: x.department,
  //       Gender: x.gender,
  //       Degree: x.degree,
  //       Mobile: x.mobile,
  //       Email: x.email,
  //       'Joining Date': formatDate(new Date(x.date), 'yyyy-MM-dd', 'en') || '',
  //     }));

  //   TableExportUtil.exportToExcel(exportData, 'excel');
  // }

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
  // onContextMenu(event: MouseEvent, item: Teachers) {
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
// export class ExampleDataSource extends DataSource<Teachers> {
//   filterChange = new BehaviorSubject('');
//   get filter(): string {
//     return this.filterChange.value;
//   }
//   set filter(filter: string) {
//     this.filterChange.next(filter);
//   }
//   // filteredData: Teachers[] = [];
//   // renderedData: Teachers[] = [];
//   constructor(
//     public exampleDatabase: TeachersService,
//     public paginator: MatPaginator,
//     public _sort: MatSort
//   ) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
//   }
//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   // connect(): Observable<Teachers[]> {
//   //   // Listen for any changes in the base data, sorting, filtering, or pagination
//   //   const displayDataChanges = [
//   //     this.exampleDatabase.dataChange,
//   //     this._sort.sortChange,
//   //     this.filterChange,
//   //     this.paginator.page,
//   //   ];
//   //   this.exampleDatabase.getAllTeacherss();
//   //   return merge(...displayDataChanges).pipe(
//   //     map(() => {
//   //       // Filter data
//   //       this.filteredData = this.exampleDatabase.data
//   //         .slice()
//   //         .filter((teachers: Teachers) => {
//   //           const searchStr = (
//   //             teachers.name +
//   //             teachers.department +
//   //             teachers.gender +
//   //             teachers.degree +
//   //             teachers.email +
//   //             teachers.mobile
//   //           ).toLowerCase();
//   //           return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//   //         });
//   //       // Sort filtered data
//   //       const sortedData = this.sortData(this.filteredData.slice());
//   //       // Grab the page's slice of the filtered sorted data.
//   //       const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//   //       this.renderedData = sortedData.splice(
//   //         startIndex,
//   //         this.paginator.pageSize
//   //       );
//   //       return this.renderedData;
//   //     })
//   //   );
//   // }
//   disconnect() {
//     //disconnect
//   }
//   /** Returns a sorted copy of the database data. */
//   sortData(data: Teachers[]): Teachers[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }
//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';
//       switch (this._sort.active) {
//         case 'id':
//           [propertyA, propertyB] = [a.id, b.id];
//           break;
//         case 'name':
//           [propertyA, propertyB] = [a.name, b.name];
//           break;
//         case 'email':
//           [propertyA, propertyB] = [a.email, b.email];
//           break;
//         case 'date':
//           [propertyA, propertyB] = [a.date, b.date];
//           break;
//         case 'time':
//           [propertyA, propertyB] = [a.department, b.department];
//           break;
//         case 'mobile':
//           [propertyA, propertyB] = [a.mobile, b.mobile];
//           break;
//       }
//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
//       return (
//         (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
//       );
//     });
//   }
// }
