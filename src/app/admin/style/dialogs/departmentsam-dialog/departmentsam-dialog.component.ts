import { StylesService } from './../../../../Service/styles.service';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DepartmentService } from 'app/Service/department.service';

import { Observable, map } from 'rxjs';
import { SectionService } from 'app/Service/section.service';

export interface DialogData {
  id: number;
  action: string;
  style: any;
}

@Component({
  selector: 'app-departmentsam-dialog',
  templateUrl: './departmentsam-dialog.component.html',
  styleUrl: './departmentsam-dialog.component.scss',
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
  ],
})
export class DepartmentsamDialogComponent {
  action: string;
  dialogTitle: string;
  styleForm: FormGroup;
  formBuilder: any;
  objstyle: any;

  displayedColumns = ['name', 'sam'];
  constructor(
    public dialogRef: MatDialogRef<DepartmentsamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,

    private snackBar: MatSnackBar,
    private _departmentservice: DepartmentService,

    private _stylesService: StylesService,
    private _Sectionservice: SectionService
  ) {
    // Set the defaults
    //this.dialogTitle = "Edit Department";
    this.action = data.action;
    this.objstyle = data.style;
    if (this.action === 'edit') {
      this.dialogTitle = 'Add SAM Details';
      this.styleForm = this.fb.group({
        sams: this.fb.array([]),
      });

      let obj = {
        styleID: this.objstyle.styleID,
        branchID: this.objstyle.branchID,
        sectionID: 0,
        name: '',
        sam: 0,
      };

      this.getAllDepartmentAsFormArray(obj).subscribe((sams) => {
        this.styleForm.setControl('sams', sams);
      });
    } else {
      this.dialogTitle = 'Add SAM Details';
      this.styleForm = this.createStyleForm();

      let obj = {
        styleID: 0,
        branchID: this.objstyle.branchID,
        sectionID: 0,
        name: '',
        sam: 0,
      };
      this.getAllDepartmentAsFormArray(obj).subscribe((sams) => {
        this.styleForm.setControl('sams', sams);
      });
    }

  }

  createStyleForm(): FormGroup {
    return this.fb.group({
      // styleID: [0],
      sams: this.fb.array([]),
      //createdBy: Number(this.LoggedInUserId)
    });
  }

  getAllDepartmentAsFormArray(obj: any): Observable<FormArray> {
    return this._Sectionservice.GetAllSectionsSam(obj).pipe(
      map((sams: any) => {
        // Maps all the sams into a formGroup defined in tge sam.model.ts
        const fgs = sams?.data?.map(this.asFormGroup);
        return new FormArray(fgs);
      })
    );
  }
  asFormGroup(samObj: any): FormGroup {
    const fg = new FormGroup({
      // styleSamID: new FormControl(),
      // branchID: new FormControl(samObj.branchID),
      sectionID: new FormControl(samObj.sectionID),
      name: new FormControl(samObj.name),
      sam: new FormControl(samObj.sam > 0 ? samObj.sam : ''),
    });
    return fg;
  }

  get sams(): FormArray {
    return this.styleForm.get('sams') as FormArray;
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

  public saveDepartmentSam(): void {
    let obj = {
      styleID: Number(this.objstyle.styleID),
    };
    let objStyle = Object.assign({});
    const samObj: any[] = []; //this.styleForm.value.sams;
    this.styleForm.value.sams.forEach((element: any) => {
      samObj.push({
        styleID: 0,
        branchID: 0,
        name: '',
        sectionID: element.sectionID,
        sam: element?.sam === null || element?.sam === '' ? 0 : element.sam,
      });
    });
    objStyle.styleID = Number(this.objstyle.styleID);
    objStyle.sams = samObj;
    this._stylesService.SaveStyleSam(objStyle).subscribe((res) => {
      if (res) {
        if (res.statusCode == 0) {
          this.showNotification(
            'snackbar-success',
            'Sam has been saved successfully.',
            'top',
            'center'
          );
        } else {
          this.showNotification(
            'snackbar-success',
            res.message,
            'top',
            'center'
          );
        }
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
