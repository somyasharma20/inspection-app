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
import { StylesService } from 'app/Service/styles.service';
import { CategoryScale } from 'chart.js';
import { CustomerService } from 'app/Service/customer.service';
//import { CategoryService } from 'app/Service/category.service';
import { DepartmentService } from 'app/Service/department.service';
import { Observable, map } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatCardImage, MatCardMdImage } from '@angular/material/card';
import { BranchService } from 'app/Service/branch.service';
import { CategoryService } from 'app/Service/category.service';

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
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  styleForm: FormGroup;
  formBuilder: any;
  objstyle: any;
  lstCustomer: any[] = [];
  lstCategory: any[] = [];
  lstBranch: any[] = [];
  previewImagePathUrl: any;
  imageFile: any[] = [];
  public currencyCode = "INR";

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public _customerService: CustomerService,
    public _categoryService: CategoryService,
    public _branchService: BranchService,
    public _departmentService: DepartmentService,
    public _stylesService: StylesService
  ) {
    // Set the defaults

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Style';
      this.objstyle = data.style;

      this.styleForm = this.fb.group({
        styleID: [this.objstyle.styleID],
        customerID: [this.objstyle.customerID],
        categoryID: [this.objstyle.categoryID],
        //branchID: [this.objstyle.branchID],
        code: [this.objstyle.code, Validators.required],
        //price: [this.objstyle.price, Validators.required],
        productionCost: [this.objstyle.productionCost, Validators.required],
        description: [this.objstyle.description],
        isActive: [this.objstyle.isActive],
        imageFile: [''],

      });

    } else {
      this.dialogTitle = 'Add Stlye';
      this.styleForm = this.createStyleForm();
    }
  }

  ngOnInit() {
    this.fillCustomer();
    this.fillCategory();
    this.fillBranch();
  }

  fillCustomer(): void {
    this._customerService.GetAllCustomer().subscribe((res) => {
      this.lstCustomer = res.data;
      //this.custSelectedchanged(this.objstyle.customerID);
    });
  }

  fillCategory(): void {
    //   let catObj = {
    //   MainCategoryID: 1,
    //   Active: true,
    // };
    this._categoryService.GetAllCategories().subscribe((res) => {
      this.lstCategory = res.data;
    });
  }
  fillBranch(): void {
    this._branchService.GetAllActiveBranch().subscribe((res) => {
      this.lstBranch = res.data;
    });
  }
  createStyleForm(): FormGroup {
    return this.fb.group({
      styleID: [0],
      customerID: ['', Validators.required],
      categoryID: ['', Validators.required],
      //branchID: [0],
      code: ['', Validators.required],
      //price: [0],
      productionCost: ['', Validators.required],
      description: [''],
      isActive: [false],
      imageFile: ['', Validators.required],
      //createdBy: Number(this.LoggedInUserId)
    });
  }

  // custSelectedchanged(customerID: number) {
  //   let objCust: any = this.lstCustomer.find(cust => cust.customerID == customerID)
  //   this.currencyCode = objCust?.currencyCode;

  // }
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

  ImageUpload(event: any) {
    //var images = [];
    this.imageFile = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          debugger;
          this.imageFile.push(event.target.result);
          this.previewImagePathUrl = event.target.result;
          this.styleForm.patchValue({
            //imageFile: this.imageFile
          });
          this.styleForm.updateValueAndValidity();
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  public confirmAdd(): void {
    if (this.styleForm.invalid) {
      this.styleForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    } else {
      let objStyle = this.styleForm.value;
      objStyle.imageFiles = this.imageFile;
      this._stylesService.SaveStyle(objStyle).subscribe((res) => {
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
