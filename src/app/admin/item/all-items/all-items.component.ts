import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemService } from 'app/Service/item.service';
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

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss'],
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
export class AllItemsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'name',
    'description',
    'isActive',
    'manufacturingCost',
    'estimatedSAM',
    'actions',
  ];
  dataSourceItem: any;

  breadscrums = [
    {
      title: 'Admin',
      items: ['Item'],
      active: 'Manage Item',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public itemService: ItemService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
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
        //item: this.item,
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
        item: lst,
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
    this.itemService.GetAllItem().subscribe(res => {
      //console.log(res.data);
      this.dataSourceItem = new MatTableDataSource<any>(res.data);
      this.dataSourceItem.paginator = this.paginator;
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
  // context menu
  // onContextMenu(event: MouseEvent, item: Item) {
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

