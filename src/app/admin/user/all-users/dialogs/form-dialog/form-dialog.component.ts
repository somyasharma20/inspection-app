import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from 'app/Service/user.service';

export interface DialogData {
  id: number;
  action: string;
  user: any;
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
export class FormDialogComponent
  implements OnInit {
  action: string;
  dialogTitle: string;
  userForm: FormGroup;
  formBuilder: any;
  objuser: any;
  lstTeam: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public userService: UserService,
    //private fb: UntypedFormBuilder
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //this.dialogTitle = data.user.dName;
      this.dialogTitle = 'Edit User';
      this.objuser = data.user;
      debugger;

      this.userForm = this.fb.group({
        userID: [this.objuser.userID],
        firstName: [this.objuser.firstName, [Validators.required]],
        lastName: [this.objuser.lastName, [Validators.required]],
        email: [this.objuser.email, [Validators.required, Validators.email]],
        mobileNo: [this.objuser.mobileNo, [Validators.required]],
        userTypeID: [this.objuser.userTypeID, [Validators.required]],
        teamID: [this.objuser.teamID, [Validators.required]],
        loginID: [this.objuser.loginID, [Validators.required]],
        //password: [this.objuser.password, [Validators.required]],
        isActive: [this.objuser.isActive],
      });
    } else {
      this.dialogTitle = 'New User';
      this.userForm = this.createUserForm();
    }
  }

  ngOnInit(): void {
    this.fillTeam();
  }

  fillTeam(): void {
    this.userService.GetTeam().subscribe(res => {
      debugger;
      this.lstTeam = res.data;
    });
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
  createUserForm(): UntypedFormGroup {
    return this.fb.group({
      userID: [0],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required]],
      userTypeID: ['', [Validators.required]],
      teamID: ['', [Validators.required]],
      loginID: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isActive: [false],
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
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    }
    else {
      this.userService.SaveUser(this.userForm.value).subscribe(res => {
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
