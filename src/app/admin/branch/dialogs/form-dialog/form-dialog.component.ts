import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
//import { TeachersService } from '../../teachers.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
//import { Teachers } from '../../teachers.model';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
//import { Teachers } from 'app/admin/teachers/all-teachers/teachers.model';
//import { TeachersService } from 'app/admin/teachers/all-teachers/teachers.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BranchService } from 'app/Service/branch.service';

export interface DialogData {
  id: number;
  action: string;
  branch: any;
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
    MatCheckbox
  ],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  //proForm: UntypedFormGroup;
  //teachers: Teachers;
  branchForm: FormGroup;
  formBuilder: any;
  objbranch: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //public teachersService: TeachersService,
    //private fb: UntypedFormBuilder
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _branchservice: BranchService
  ) {

    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = "Edit Center"// + data.branch.name;
      this.objbranch = data.branch;
      debugger;

      this.branchForm = this.fb.group({
        branchID: [this.objbranch.branchID],
        name: [this.objbranch.name, Validators.required],
        phone: [this.objbranch.phone, Validators.required],
        city: [this.objbranch.city, Validators.required],
        state: [this.objbranch.state, Validators.required],
        zipcode: [this.objbranch.zipcode, Validators.required],
        country: [this.objbranch.country, Validators.required],
        isActive: [this.objbranch.isActive],
      });

    } else {
      this.dialogTitle = 'Add Center';
      //const blankObject = {} as Teachers;
      //this.teachers = new Teachers(blankObject);
      this.branchForm = this.createBranchForm();
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
  createBranchForm(): FormGroup {
    return this.fb.group({
      branchID: [0],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],
      isActive: [false],
      //createdBy: Number(this.LoggedInUserId)
    });
    // return this.fb.group({
    //   id: [this.teachers.id],
    //   img: [this.teachers.img],
    //   name: [this.teachers.name],
    //   email: [
    //     this.teachers.email,
    //     [Validators.required, Validators.email, Validators.minLength(5)],
    //   ],
    //   date: [
    //     formatDate(this.teachers.date, 'yyyy-MM-dd', 'en'),
    //     [Validators.required],
    //   ],
    //   gender: [this.teachers.gender],
    //   mobile: [this.teachers.mobile],
    //   department: [this.teachers.department],
    //   degree: [this.teachers.degree],
    // });
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
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    }
    else {
      this._branchservice.SaveBranch(this.branchForm.value).subscribe(res => {
        debugger;
        if (res.data > 0) {
          this.showNotification(
            'snackbar-success',
            'Record has been saved successfully.',
            'top',
            'center'
          );


        }
        else if (res == -1) {
          this.showNotification(
            'snackbar-success',
            'Branch name already exists.',
            'top',
            'center'
          );


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
