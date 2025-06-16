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
import { CustomerService } from 'app/Service/customer.service';
import { UserService } from 'app/Service/user.service';

export interface DialogData {
  id: number;
  action: string;
  customer: any;
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
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  //proForm: UntypedFormGroup;
  //teachers: Teachers;
  customerForm: FormGroup;
  formBuilder: any;
  objcustomer: any;
  lstCurrency: any[] = [];
  lstTeam: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    //public teachersService: TeachersService,
    //private fb: UntypedFormBuilder
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _customerService: CustomerService,
    private userService: UserService
  ) {
    // Set the defaults
    //this.GetAllCurrency();
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Customer';
      this.objcustomer = data.customer;
      debugger;

      this.customerForm = this.fb.group({
        customerID: [this.objcustomer.customerID],
        name: [this.objcustomer.name, Validators.required],
        code: [this.objcustomer.code, Validators.required],
        country: [this.objcustomer.country, Validators.required],
        currencyID: [this.objcustomer.currencyID, Validators.required],
        description: [this.objcustomer.description],
        isActive: [this.objcustomer.isActive],
        teamID: [this.objcustomer.teamID, Validators.required],
      });
    } else {
      this.dialogTitle = 'Add Customer';
      this.customerForm = this.createCustomerForm();
    }
  }

  createCustomerForm(): FormGroup {
    return this.fb.group({
      cutomerID: [0],
      name: ['', Validators.required],
      code: ['', Validators.required],
      country: ['', Validators.required],
      currencyID: ['', Validators.required],
      description: [''],
      isActive: [false],
      teamID:['', Validators.required]
      //createdBy: Number(this.LoggedInUserId)
    });
  }

  ngOnInit() {
    this.GetAllCurrency();
    this.fillTeam();
  }
  GetAllCurrency(): void {
    this._customerService.GetAllCurrency().subscribe((res) => {
      this.lstCurrency = res.data;
    });
  }

  fillTeam(): void {
    this.userService.GetTeam().subscribe(res => {
      debugger;
      this.lstTeam = res.data;
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
    debugger;
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    } else {
      this._customerService
        .SaveCustomer(this.customerForm.value)
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
              'Customer name already exists.',
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
