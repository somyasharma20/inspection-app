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
import { UserService } from 'app/Service/user.service';
import { JobinspectionService } from 'app/Service/jobinspection.service';
import { environment } from 'environments/environment.development';
import { Subject } from 'rxjs';


export interface DialogData {
  id: number;
  action: string;
  jobInspection: any;
}
declare var $: any;
declare var window: any

@Component({
  //selector: 'app-form-dialog:not(h)',
  selector: 'app-jobinspectionimage:not(h)',
  standalone: true,

  templateUrl: './jobinspectionimage.component.html',
  styleUrl: './jobinspectionimage.component.scss',

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
export class JobinspectionimageComponent implements OnInit {
  action: string;
  dialogTitle: string;
  jobInspection: any;
  lstJobInspection: any[] = [];
  _albums: any[] = [];

  APIURL: any = "";
  RotationDegree: any;
  public filePath: string = "";
  //onClose: Subject<boolean>;
  public imgWidth = 500;
  IdDocTypeName: string = "";
  ethnicity: any;
  gender: any;

  constructor(
    public dialogRef: MatDialogRef<JobinspectionimageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _jobInspectionService: JobinspectionService,
    private userService: UserService,
    // private _lightbox: Lightbox
  ) {
    this.action = data.action;
    this.jobInspection = data.jobInspection;
    if (this.action === 'edit') {
      this.dialogTitle = 'Inspection Details';
    } else {
      this.dialogTitle = 'Inspection Details';
    }
    var host = window.location.host;

    if (host == '192.168.0.77') {
      this.APIURL = environment.APIURL;
    } else if (host == '182.77.63.44') {
      this.APIURL = environment.APIURL_static;
    } else {
      this.APIURL = environment.APIURL;
    }
  }

  ngOnInit() {
    this.GetAllJobInspectionDetails();
  }
  GetAllJobInspectionDetails(): void {
    this._jobInspectionService
      .GetAllJobInspectionDetails({
        jobInspectionID: Number(this.jobInspection?.jobInspectionID),
      })
      .subscribe((res) => {
        this.lstJobInspection = res.data;

        this.lstJobInspection.forEach((ele: any) => {
          const album = {
            src:
              this.APIURL +
              '/JobInspectionImage/' +
              this.jobInspection?.jobInspectionID +
              '/' +
              ele.image,
            caption: ele.comments,
            thumb:
              this.APIURL +
              '/JobInspectionImage/' +
              this.jobInspection?.jobInspectionID +
              '/' +
              ele.image,
          };

          this._albums.push(album);
        });
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
    this.showNotification(
      'snackbar-success',
      'Record has been saved successfully.',
      'top',
      'center'
    );
  }
  open(index: number): void {
    // open lightbox
    // this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    // this._lightbox.close();
  }


  fnRemoveimg(item: any) {

    var r = confirm("Are you sure, you want to delete?");
    if (r == true) {
      this._jobInspectionService.DeleteJobInspectionDetails({ jobInspectionDetailId: item })
        .subscribe(result => {
          let re = result.data;
          this.showNotification(
            'snackbar-success',
            'Record has been deleted successfully.',
            'top',
            'center'
          );
          this.GetAllJobInspectionDetails();
          // if (result > 0) {
          //   this.toasterService.success("Image deleted successfully.");
          //   this.onClose.next(true);
          //   //this.bsModalRef.hide()
          // }
          // else {
          //   this.toasterService.error("Invalid.");
          // }
          //this.fnGetApplicantEverifyDoc()
        });
    }
  }
  fnZoomOut(index: number) {
    debugger
    let ImgId = "img" + index;
    this.imgWidth += 10;
    $('#' + ImgId).width(this.imgWidth);
  }
  fnZoomIn(index: number) {
    let ImgId = "img" + index;
    this.imgWidth -= 10;
    $('#' + ImgId).width(this.imgWidth);
  }
  fnZoomReset(index: number) {
    let ImgId = "img" + index;
    this.imgWidth = 500;
    $('#' + ImgId).width(this.imgWidth);
    $('#' + ImgId).css("transform", "rotate(0deg)");
  }
  fnImgRotate(index: number) {
    debugger
    let ImgId = "img" + index;
    let rvalue = window?.document?.getElementById(ImgId).style.transform;
    if (rvalue == "" || rvalue == "rotate(0deg)") {
      $('#' + ImgId).css("transform", "rotate(90deg)");
    }
    else if (rvalue == "rotate(90deg)") {
      $('#' + ImgId).css("transform", "rotate(180deg)");
    }
    else if (rvalue == "rotate(180deg)") {
      $('#' + ImgId).css("transform", "rotate(270deg)");
    }
    else if (rvalue == "rotate(270deg)") {
      $('#' + ImgId).css("transform", "rotate(360deg)");
    }
    else {
      $('#' + ImgId).css("transform", "rotate(90deg)");
    }
  }
}
