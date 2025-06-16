import { StylesService } from 'app/Service/styles.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { TeachersService } from './teachers.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';


import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
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

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
//import { DeleteDialogComponent } from 'app/admin/teachers/all-teachers/dialogs/delete/delete.component';

import { JobService } from 'app/Service/job.service';

import { environment } from 'environments/environment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-add-jobdetail',
  standalone: true,
  templateUrl: './add-jobdetail.component.html',
  styleUrl: './add-jobdetail.component.scss',
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

    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    MatTableModule,
  ],

})
export class AddJobdetailComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = ['code', 'quantity', 'active', 'actions'];
  public APIURL = environment.APIURL;
  lstData: any = [];
  lstStyles: any = [];
  action: string;
  dialogTitle: string;
  jobdetailForm: FormGroup;
  formBuilder: any;
  objjob: any;
  jobID: number = 0;
  dataSourceStyle = new MatTableDataSource<any>(this.lstData);

  breadscrums = [
    {
      title: 'Admin',
      items: ['Job'],
      active: 'Manage Job Detail',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _jobService: JobService,
    private _stylesService: StylesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.jobID = +params.get('id')!;
    });

    this.action = 'edit1'; //data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Job Detail';
      //this.objjob = data.style;
      this.jobdetailForm = this.fb.group({
        jobDetailID: [this.objjob?.jobDetailID],
        JobID: [this.objjob.jobID],
        styleID: ['', Validators.required],
        quantity: ['', Validators.required],
        isActive: [this.objjob.isActive],
      });
    } else {
      this.dialogTitle = 'Add Job Detail';
      this.jobdetailForm = this.createJobdetailForm();
    }
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  createJobdetailForm(): FormGroup {
    return this.fb.group({
      jobDetailID: [0],
      jobID: [0],
      styleID: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.GetAllStyleByJobID();

    this.loadJobDetail();
  }

  GetAllStyleByJobID(): void {
    let obj = {
      jobID: this.jobID,
    };
    this._stylesService.GetAllStyleByJobID(obj).subscribe((res) => {
      this.lstStyles = res.data;
    });
  }
  refresh() {
    //this.loadData();
  }
  addNew() {
    this.GetAllStyleByJobID();
    this.dialogTitle = 'Add Job Detail';
    this.jobdetailForm = this.createJobdetailForm();
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   data: {
    //     action: 'add',
    //   },
    //   //direction: tempDirection,
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     this.refreshTable();
    //     this.loadStyle();
    //   }
    // });
  }

  Edit(item: any) {
    debugger;
    this.dialogTitle = 'Edit Job Detail';
    this.objjob = item;
    this.lstStyles.push({ styleID: this.objjob.styleID, code: this.objjob.code })
    //this.lstStyles.sort((a,b) => a.styleID - b.styleID);
    this.jobdetailForm = this.fb.group({
      jobDetailID: [this.objjob?.jobDetailID],
      JobID: [this.objjob.jobID],
      styleID: [this.objjob.styleID, Validators.required],
      quantity: [this.objjob.quantity, Validators.required],
      price: [this.objjob.price],
    });
  }

  Delete(item: any) {
    if (confirm("Are you sure you want to delete this item? " + item.code)) {
      let obj = {
        jobDetailID: item.jobDetailID,
      };
      this._jobService.DeleteJobDetail(obj).subscribe((res) => {
        this.loadJobDetail();
        this.GetAllStyleByJobID();
        this.dialogTitle = 'Add Job Detail';
        this.jobdetailForm = this.createJobdetailForm();
      });
    }
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

  public loadJobDetail() {

    let obj = {
      jobID: this.jobID,
    };
    this._jobService.GetAllJobDetail(obj).subscribe((res) => {
      this.lstData = res.data;
      this.dataSourceStyle = new MatTableDataSource<any>(res.data);
    });
    this.jobdetailForm.patchValue({
      jobID: this.jobID,
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

  GotoJobDetail(lst: any) {
    //this.router.navigate(['job/add-jobdetail']);
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    //this.dialogRef.close();
    this.router.navigate(['/admin/job/add-job']);
  }

  public confirmAdd(): void {
    if (this.jobdetailForm.invalid) {
      this.jobdetailForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    } else {
      debugger;
      this._jobService
        .SaveJobDetail(this.jobdetailForm.value)
        .subscribe((res) => {
          debugger;
          if (res.data > 0) {
            this.loadJobDetail();
            this.GetAllStyleByJobID();
            this.dialogTitle = 'Add Job Detail';
            this.jobdetailForm = this.createJobdetailForm();
            this.showNotification(
              'snackbar-success',
              'Record has been saved successfully.',
              'top',
              'center'
            );
          } else if (res == -1) {
            this.showNotification(
              'snackbar-success',
              'Style name already exists.',
              'top',
              'center'
            );
          } else {
            this.showNotification(
              'snackbar-danger',
              'Server error, Please try again after some time."',
              'top',
              'center'
            );
          }
        });
    }
  }
}
