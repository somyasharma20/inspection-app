import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { SectionService } from 'app/Service/section.service';
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
  section: any[];
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
  sectionForm: FormGroup;
  formBuilder: any;
  objsection: any;
  lstDepartment: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public sectionService: SectionService,
    public departmentService: DepartmentService,
    //private fb: UntypedFormBuilder
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      //this.dialogTitle = data.section.dName;
      this.dialogTitle = 'Edit Section';
      this.objsection = data.section;
      debugger;

      this.sectionForm = this.fb.group({
        sectionID: [this.objsection.sectionID],
        departmentID: [this.objsection.departmentID, Validators.required],
        name: [this.objsection.name, Validators.required],
        description: [this.objsection.description],
        isProduction: [this.objsection.isProduction],
        isActive: [this.objsection.isActive],
      });
    } else {
      this.dialogTitle = 'Add Section';
      this.sectionForm = this.createSectionForm();
    }
  }

  ngOnInit(): void {
    this.fillDepartment();
  }

  fillDepartment(): void {
    this.departmentService.GetAllDepartment().subscribe(res => {
      debugger;
      this.lstDepartment = res.data;
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
  createSectionForm(): FormGroup {
    return this.fb.group({
      sectionID: [0],
      departmentID: [0, [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      isProduction: [false],
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
    if (this.sectionForm.invalid) {
      this.sectionForm.markAllAsTouched();
      this.showNotification(
        'snackbar-success',
        'All the * marked fields are mandatory',
        'top',
        'center'
      );

      return;
    }
    else {
      this.sectionService.SaveSection(this.sectionForm.value).subscribe(res => {
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
