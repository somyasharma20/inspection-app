import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
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
  FormArray,
  FormControl,
} from '@angular/forms';

import { DatePipe, formatDate } from '@angular/common';
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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { StylesService } from 'app/Service/styles.service';
import { CategoryScale } from 'chart.js';
import { CustomerService } from 'app/Service/customer.service';
import { CategoryService } from 'app/Service/category.service';
import { DepartmentService } from 'app/Service/department.service';
import { Observable, map } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatCardImage, MatCardMdImage } from '@angular/material/card';
import { BranchService } from 'app/Service/branch.service';
import { JobService } from 'app/Service/job.service';
//import { JobService } from 'app/Service/job.service';

export interface DialogData {
  id: number;
  action: string;
  style: any;
}

@Component({
  selector: 'app-form-dialog:not(h)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
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
    MatTableModule,
    //MatCardImage
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'us-en' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  jobForm: FormGroup;
  formBuilder: any;
  objjob: any;
  lstCustomer: any[] = [];

  previewImagePathUrl: any;
  imageFile: any[] = [];
  public currencyCode = "INR";

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public _customerService: CustomerService,

    public _departmentService: DepartmentService,
    public _jobService: JobService,
    private _datePipe: DatePipe,
  ) {
    // Set the defaults

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Job';
      this.objjob = data.style;

      this.jobForm = this.fb.group({
        jobID: [this.objjob.jobID],
        jobNo: [this.objjob.jobNo, Validators.required],
        customerID: [this.objjob.customerID],
        jobDate: [this.objjob.jobDate],
        remarks: [this.objjob.remarks],
        isActive: [this.objjob.isActive]
      });

    } else {
      this.dialogTitle = 'Add Job';
      this.jobForm = this.createJobForm();
    }
  }

  ngOnInit() {
    this.fillCustomer();

  }

  fillCustomer(): void {
    this._customerService.GetAllCustomer().subscribe((res) => {
      this.lstCustomer = res.data;
    });
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  createJobForm(): FormGroup {
    return this.fb.group({
      jobID: [0],
      jobNo: ['', Validators.required],
      customerID: ['', Validators.required],
      jobDate: [''],
      remarks: [''],
      isActive: [false]
    });
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
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


  public confirmAdd(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    } else {
      debugger

      let obj = {
        jobID: Number(this.jobForm.value.jobID),
        jobNo: String(this.jobForm.value.jobNo),
        customerID: Number(this.jobForm.value.customerID),
        jobDate: (this._datePipe.transform(new Date(this.jobForm.value.jobDate).toString(), 'yyyy-MM-dd') + ' 00:00:00'),
        Remarks: String(this.jobForm.value.jobNo),
        isActive: this.jobForm.value.isActive,
        CreatedBy: 1

      };

      this._jobService.SaveJob(this.jobForm.value).subscribe((res) => {
        debugger;
        if (res.data > 0) {
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
