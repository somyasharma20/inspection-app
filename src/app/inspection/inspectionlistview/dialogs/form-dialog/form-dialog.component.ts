import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DepartmentService } from 'app/Service/department.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BranchService } from 'app/Service/branch.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';


export interface DialogData {
  id: number;
  action: string;
  inspection: any[];
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
    MatCheckbox,
    FileUploadComponent
  ],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  inspectionForm: FormGroup;
  formBuilder: any;
  objinspection: any;
  userID: number = 0;
  lstBranch: any[] = [];
  lstDepartment: any[] = [];


  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public departmentService: DepartmentService,
    public branchService: BranchService,

    //private fb: UntypedFormBuilder
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router

  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //this.dialogTitle = data.department.dName;
      this.dialogTitle = 'Edit Inspection';
      this.objinspection = data.inspection;
      debugger;

      this.inspectionForm = this.fb.group({
        inspectionID: [this.objinspection.inspectionID],
        name: [this.objinspection.name, Validators.required],
        description: [this.objinspection.description],
        isActive: [this.objinspection.isActive],
      });
    } else {
      this.dialogTitle = 'Add Inspection';
      this.inspectionForm = this.createinspectionForm();
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.userID = +params.get('id')!;
        this.fillBranch(this.userID);
      });
    }

  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  fillBranch(userID: number): void {
    this.branchService.GetAllBranchByUser(userID).subscribe(res => {
      console.log(res.data);
      this.lstBranch = res.data;
    });
  }

  fillDepartment(branchID: number): void {
    this.departmentService.GetAllDepartmentByBranch(branchID).subscribe(res => {
      console.log(res.data);
      this.lstDepartment = res.data;
    });
  }
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createinspectionForm(): FormGroup {
    return this.fb.group({
      insepctionID: [0],
      branchID: ['', [Validators.required]],
      departmentID: ['', [Validators.required]],
      files: [null,[Validators.required]]
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
    if (this.inspectionForm.invalid) {
      this.inspectionForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    }
    else {
      this.departmentService.SaveDepartment(this.inspectionForm.value).subscribe(res => {
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
