/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class FileUploadComponent implements ControlValueAccessor {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;
  onChange!: Function;
  public file: File | null = null;

  // @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
  //   const file = event && event.item(0);
  //   this.onChange(file);
  //   this.file = file;
  // }

  constructor(private host: ElementRef<HTMLInputElement>) { }
  emitFiles(event: Event) {
    const input = event.target as HTMLInputElement;
    const fileList = input.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      this.onChange(file);
      this.file = file;
    }
  }
  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    // add code here
  }
  fileUpload(): void {
    this.fileInput.nativeElement.click();
  }
}
