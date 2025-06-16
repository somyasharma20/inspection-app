import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { LocalStorageService } from 'app/Service/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
})
export class AddDepartmentComponent {
  departmentForm: UntypedFormGroup;
  
  breadscrums = [
    {
      title: 'Add Location',
      items: ['Location'],
      active: 'Add',
    },
  ];
  constructor(private fb: UntypedFormBuilder,  private _LocalStorage: LocalStorageService,
    private router: Router,) {
    this.departmentForm = this.fb.group({
      dName: ['', [Validators.required]],
      hod: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      sYear: [''],
      sCapacity: ['', [Validators.required]],
      details: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.departmentForm.value);
  }
}
