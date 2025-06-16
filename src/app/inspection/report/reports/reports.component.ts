import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
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
//import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobinspectionService } from 'app/Service/jobinspection.service';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';

//import { TeachersService } from '../../teachers.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,

} from '@angular/forms';


import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatCheckbox } from '@angular/material/checkbox';
import { DepartmentService } from 'app/Service/department.service';
import { SectionService } from 'app/Service/section.service';
import { StylesService } from 'app/Service/styles.service';
import { UserService } from 'app/Service/user.service';
import { environment } from 'environments/environment.development';
//import { ImagelightboxModule } from '../imagelightbox/imagelightbox.module';
import { JobinspectionimageComponent } from 'app/inspection/jobinspectionimage/jobinspectionimage.component';
import { BranchService } from 'app/Service/branch.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',

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
    NgFor,

    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogClose,
    MatCheckbox,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'us-en' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ReportsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'requestNo',
    'branchName',
    'departmentName',
    
    'auditor',
    'createdDate',
    'actions',
  ];

  lstData: any = [];
  dataSourceItem = new MatTableDataSource<any>(this.lstData);

  breadscrums = [
    {
      title: 'Inspection',
      items: ['Reports'],
      active: 'Report',
    },
  ];

  reportForm: FormGroup;
  lstBranch: any = [];
  lstDepartment: any = [];
  lstSection: any = [];
  lstInspection: any = [];
  lstStyle: any = [];
  lstUser: any = [];

  private Report_Path = environment.Report_Path;
  private Report_Path_static = environment.Report_Path_static;
  private reporturl!: string;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public itemService: ItemService,
    public branchService: BranchService,
    public departmentService: DepartmentService,
    public sectionService: SectionService,
    public stylesService: StylesService,
    public userService: UserService,
    private jobinspectionService: JobinspectionService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private _datePipe: DatePipe
  ) {
    super();
    this.reportForm = this.createReportForm();
    var host = window.location.host;

    if (host == "192.168.0.77") {
      this.reporturl = this.Report_Path;

    }
    else if (host == "182.77.63.44") {
      this.reporturl = this.Report_Path_static;

    }
    else {
      this.reporturl = this.Report_Path;

    }


  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {

    //this.loadData();
    this.LoadBranch();
    this.loadDepartment();
    this.loadSection();
    this.loadInspection();
    this.loadStyle();
    this.loadAuditor();
    //this.loadJobInspection();
  }

  LoadBranch() {
    this.branchService.GetAllBranch().subscribe((res) => {
      this.lstBranch = res.data;
    });
  }

  loadDepartment() {
    this.departmentService.GetAllDepartment().subscribe((res) => {
      this.lstDepartment = res.data;
    });
  }
  loadSection() {
    this.sectionService.GetAllSection().subscribe((res) => {
      this.lstSection = res.data;
    });
  }
  loadInspection() {
    this.jobinspectionService.GetAllInspections().subscribe((res) => {
      this.lstInspection = res.data;
    });
  }
  loadStyle() {
    this.stylesService.GetAllStyle().subscribe((res) => {
      this.lstStyle = res.data;
    });
  }
  loadAuditor() {
    this.userService.GetAllUser().subscribe((res) => {
      this.lstUser = res.data;
    });
  }
  createReportForm(): FormGroup {
    return this.formBuilder.group({
      jobNo: [''],
      branchID: [''],
      departmentID: [''],
      Result: [''],
      inspectionID: [''],
      styleID: [''],
      startDate: [''],
      endDate: [''],
      //createdBy: [''],
      // teamID:['', Validators.required]
      createdBy: [''], //Number(this.LoggedInUserId)
    });
  }
  refresh() {
    this.loadJobInspection();
    // this.loadData();
  }


  ShowImage(lst: any) {
    // let obj = {
    //   jobInspectionID: Number(lst.jobInspectionID),
    // };
    // this.jobinspectionService
    //   .GetJobInspectionDetailReport(obj)
    //   .subscribe((res) => {
    //
    //     let data = res?.data;
    //   });

    const dialogRef = this.dialog.open(JobinspectionimageComponent, {
      data: {
        action: 'add',
        jobInspection: lst,

      },
      //direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {


      }
    });

  }
  ShowReport(lst: any) {
    let obj = {
      jobInspectionID: Number(lst.jobInspectionID),
    };
    this.jobinspectionService
      .GetJobInspectionDetailReport(obj)
      .subscribe((res) => {
        debugger;
        let data = res?.data;
        var url =
          window.open(this.reporturl + data, "_blank");
      });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadJobInspection() {
    let obj = {
      jobNo: this.reportForm.value.jobNo,
      branchID:
        this.reportForm.value.branchID != ''
          ? Number(this.reportForm.value.branchID)
          : 0,
      departmentID:
        this.reportForm.value.departmentID != ''
          ? Number(this.reportForm.value.departmentID)
          : 0,
      sectionID:
        this.reportForm.value.sectionID != ''
          ? Number(this.reportForm.value.sectionID)
          : 0,
      inspectionID:
        this.reportForm.value.inspectionID != ''
          ? Number(this.reportForm.value.inspectionID)
          : 0,
          Result:
        this.reportForm.value.Result != ''
          ? Number(this.reportForm.value.Result)
          : 0,
      startDate:
        this.reportForm.value.startDate != ''
          ? this._datePipe.transform(
            new Date(this.reportForm.value.startDate).toString(),
            'yyyy-MM-dd'
          )
          : null,
      endDate: this.reportForm.value.endDate
        ? this._datePipe.transform(
          new Date(this.reportForm.value.endDate).toString(),
          'yyyy-MM-dd'
        )
        : null,
      createdBy:
        this.reportForm.value.createdBy != ''
          ? Number(this.reportForm.value.createdBy)
          : 0,
    };
    debugger;

    this.jobinspectionService.SearchJobInspections(obj).subscribe((res) => {
      this.dataSourceItem = new MatTableDataSource<any>(res.data);
      this.dataSourceItem.sort = this.sort;
      this.dataSourceItem.paginator = this.paginator;
    });
  }
  submit(): void { }

  ResetJobInspection(): void {
    this.reportForm.reset();
  }
  SearchJobInspection(): void {

    this.loadJobInspection();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceItem.filter = filterValue.trim().toLowerCase();
  }

}
