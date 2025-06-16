import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from 'app/Service/employee.service';
import { BranchService } from 'app/Service/branch.service';
import { DepartmentService } from 'app/Service/department.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface DialogData {
  id: number;
  action: string;
  employee: any;
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
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDialogClose,
    MatCheckbox
  ],
})
export class FormDialogComponent implements OnInit{
  action: string;
  dialogTitle: string;
  employeeForm: FormGroup;
  formBuilder: any;
  objemployee: any;
  lstBranch: any[] = [];
  lstDepartment: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeeService: EmployeeService,
    public branchService: BranchService,
    public departmentService: DepartmentService,
    //private fb: UntypedFormBuilder
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //this.dialogTitle = data.employee.dName;
      this.dialogTitle = 'Edit Employee';
      this.objemployee = data.employee;
      debugger;

      this.employeeForm = this.fb.group({
        employeeID: [this.objemployee.employeeID],
        firstName: [this.objemployee.firstName, [Validators.required]],
        lastName: [this.objemployee.lastName, [Validators.required]],
        branchID: [this.objemployee.branchID, [Validators.required]],
        departmentID: [this.objemployee.departmentID, [Validators.required]],
        code: [this.objemployee.code, [Validators.required]],
        grade: [this.objemployee.grade, [Validators.required]],
        workDescription: [this.objemployee.workDescription],
        isActive: [this.objemployee.isActive],
      });
    } else {
      this.dialogTitle = 'New Employee';
      this.employeeForm = this.createEmployeeForm();
    }

  }

  ngOnInit(): void {
    this.fillBranch();
    if (this.action === 'edit') {
    this.fillDepartment(this.objemployee.branchID);
    }
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createEmployeeForm(): UntypedFormGroup {
    return this.fb.group({
      employeeID: [0],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      branchID: ['0', [Validators.required]],
      departmentID: ['0', [Validators.required]],
      code: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      workDescription: [''],
      isActive: [false],
    });
  }

  fillBranch(): void {
    this.branchService.GetAllActiveBranch().subscribe(res => {
      console.log(res.data);
      this.lstBranch = res.data;
    });
  }

  fillDepartment(branchID: number): void {
    debugger;
    this.departmentService.GetAllDepartmentByBranch(branchID).subscribe(res => {
      //console.log(res.data);
      let lst: any[] = res.data;
      this.lstDepartment = lst.filter(element => element.isSelected == true);
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
    //this.teachersService.addTeachers(this.proForm.getRawValue());
    debugger;
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    }
    else {
      this.employeeService.SaveEmployee(this.employeeForm.value).subscribe(res => {
        if (res) {
          if (res.statusCode == 0) {
            this.showNotification(
              'snackbar-success',
              'Record has been saved successfully.',
              'top',
              'center'
            );
          }
          else {
            this.showNotification(
              'snackbar-success',
              res.message,
              'top',
              'center'
            );
          }
        }
        else {
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
