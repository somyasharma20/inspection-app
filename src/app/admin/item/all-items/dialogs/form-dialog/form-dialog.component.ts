import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ItemService } from 'app/Service/item.service';
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
  item: any;
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
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  itemForm: FormGroup;
  formBuilder: any;
  objitem: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public itemService: ItemService,
    //private fb: UntypedFormBuilder
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //this.dialogTitle = data.item.dName;
      this.dialogTitle = 'Edit Item';
      this.objitem = data.item;
      debugger;

      this.itemForm = this.fb.group({
        itemID: [this.objitem.itemID],
        name: [this.objitem.name, [Validators.required]],
        description: [this.objitem.description],
        image: [this.objitem.image],
        manufacturingCost: [this.objitem.manufacturingCost, [Validators.required]],
        estimatedSAM: [this.objitem.estimatedSAM, [Validators.required]],
        isActive: [this.objitem.isActive],
      });
    } else {
      this.dialogTitle = 'New Item';
      this.itemForm = this.createItemForm();
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
  createItemForm(): UntypedFormGroup {
    return this.fb.group({
      itemID: [0],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      itemTypeID: ['', [Validators.required]],
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
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    }
    else {
      this.itemService.SaveItem(this.itemForm.value).subscribe(res => {
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
