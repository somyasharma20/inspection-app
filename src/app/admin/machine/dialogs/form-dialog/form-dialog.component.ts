
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

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

import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
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

import { MachineService } from 'app/Service/machine.servive';
import { DepartmentService } from 'app/Service/department.service';
import { BranchService } from 'app/Service/branch.service';
import { Department } from 'app/admin/departments/all-departments/department.model';
import { SectionService } from 'app/Service/section.service';

export interface DialogData {
  id: number;
  action: string;
  machine: any;
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
  ],
})
export class FormDialogComponent implements OnInit{
  action: string;
  dialogTitle: string;
  //proForm: UntypedFormGroup;
  //teachers: Teachers;
  machineForm: FormGroup;
  formBuilder: any;
  objmachine: any;
  lstBranch: any[]=[];
  lstDepartment: any[]=[];
  lstSection: any[]=[];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //public teachersService: TeachersService,
    //private fb: UntypedFormBuilder
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _machineService: MachineService,
    private _branchService: BranchService,
    private _departmentService: DepartmentService,
    private _sectionService: SectionService
  ) {
    // Set the defaults
  
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Machine'; // + data.branch.name;
      this.objmachine = data.machine;
      this.fillDepartment(this.objmachine.branchID);
      this.fillSection(this.objmachine.departmentID);
      this.machineForm = this.fb.group({
        machineID: [this.objmachine.machineID],
        name: [this.objmachine.name, Validators.required],
        code: [this.objmachine.code, Validators.required],
        workDescription: [this.objmachine.workDescription, Validators.required],
        isActive: [this.objmachine.isActive],
        branchID:[this.objmachine.branchID, Validators.required],
        departmentID:[this.objmachine.departmentID, Validators.required],
        sectionID:[this.objmachine.sectionID, Validators.required]      
      });
    } else {
      this.dialogTitle = 'Add Machine';
      this.machineForm = this.createMachineForm();
    }
  }
 
  createMachineForm(): FormGroup {
    return this.fb.group({
      machineID: [0],
      name: ['', Validators.required],
      code: ['', Validators.required],
      isActive: [false],
      workDescription: ['', Validators.required],
      branchID:['', Validators.required],
      departmentID:['', Validators.required],
      sectionID:['', Validators.required]
      
      //createdBy: Number(this.LoggedInUserId)
    });
    
  }
  
  ngOnInit() {
    this.GetAllBranch();
    
  }
  GetAllBranch(): void {
    this._branchService.GetAllActiveBranch().subscribe((res) => {
      this.lstBranch = res.data;
    });
  }

  fillDepartment(branchID: number): void {
    this._departmentService.GetAllDepartmentByBranch(branchID).subscribe(res => {
      let lst: any[] = res.data;
      this.lstDepartment = lst.filter(element => element.isSelected == true);
    });
  }

  fillSection(departmentID: number): void {
    this._sectionService.GetAllSectionByDepartment(departmentID).subscribe(res => {
      this.lstSection = res.data;
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
    
    if (this.machineForm.invalid) {
      this.machineForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    } else {
      this._machineService
        .SaveMachine(this.machineForm.value)
        .subscribe((res) => {
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
              'Machine name already exists.',
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
