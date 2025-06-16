import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DepartmentService } from 'app/Service/department.service';

export interface DialogData {
  id: number;
  branchID: number;
}

@Component({
  selector: 'app-department-dialog:not(h)',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss'],
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
export class DepartmentDialogComponent {
  dialogTitle: string;
  lstDepartment: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private _departmentservice: DepartmentService
  ) {

    // Set the defaults
    this.dialogTitle = "Edit Location";
    this.fillDepartment(data.branchID);
  }

  fillDepartment(branchID: number): void {
    this._departmentservice.GetAllDepartmentByBranch(branchID).subscribe(res => {
      console.log(res.data);
      this.lstDepartment = res.data;
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

  public saveDepartment(lst: any[]): void {
    debugger;
    let lstShared = lst.filter(element => element.isSelected == true);
    let strShared = "";
    lstShared.forEach(val => {
      strShared = strShared == "" ? val.departmentID : (strShared + "," + val.departmentID);
    });
    let obj = {
      branchID: Number(this.data.branchID),
      departmentIDs: strShared
    }

    this._departmentservice.SaveBranchDepartment(obj).subscribe(res => {
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
