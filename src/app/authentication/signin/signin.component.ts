import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from 'app/Service/local-storage.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  User: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _LocalStorage: LocalStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      // username: ['admin@school.org', Validators.required],
      // password: ['admin@123', Validators.required],
      username: [, Validators.required],
      password: [, Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  // adminSet() {
  //   this.authForm.get('username')?.setValue('admin@school.org');
  //   this.authForm.get('password')?.setValue('admin@123');
  // }
  // teacherSet() {
  //   this.authForm.get('username')?.setValue('teacher@school.org');
  //   this.authForm.get('password')?.setValue('teacher@123');
  // }
  // studentSet() {
  //   this.authForm.get('username')?.setValue('student@school.org');
  //   this.authForm.get('password')?.setValue('student@123');
  // }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      let UserObj = {
        LoginId: this.f['username'].value,
        password: this.f['password'].value,
        UserType: 1
      }
      this.authService
        //.login(this.f['username'].value, this.f['password'].value)
        .ValidLogin(UserObj)
        .subscribe({
          next: (res) => {
            debugger
            //if (res) {
            if (res.data != null) {
              setTimeout(() => {


                this.subs.sink = this.authService
                  .login('admin', 'admin@123')
                  .subscribe({
                    next: (res) => {
                      // if (res) {
                      //   setTimeout(() => {
                      //     const role = this.authService.currentUserValue.role;
                      //     // if (role === Role.All || role === Role.Admin) {
                      //     //   this.router.navigate(['/admin/dashboard/main']);
                      //     // } else if (role === Role.Teacher) {
                      //     //   this.router.navigate(['/teacher/dashboard']);
                      //     // } else if (role === Role.Student) {
                      //     //   this.router.navigate(['/student/dashboard']);
                      //     // } else {
                      //     //   this.router.navigate(['/authentication/signin']);
                      //     // }
                      //     this.router.navigate(['/admin/dashboard/dashboard2']);
                      //     this.loading = false;
                      //   }, 1000);
                      // } else {
                      //   this.error = 'Invalid Login';
                      // }
                    },
                    error: (error) => {
                      this.error = error;
                      this.submitted = false;
                      this.loading = false;
                    },
                  });
                  debugger
                this.User = res.data;
                this._LocalStorage.storeOnLocalStorage("userID", this.User.userID.toString());
                this._LocalStorage.storeOnLocalStorage("userTypeID", this.User.userTypeID.toString());
                this._LocalStorage.storeOnLocalStorage("firstName", this.User.firstName.toString());
                this._LocalStorage.storeOnLocalStorage("lastName", this.User.lastName.toString());
                this._LocalStorage.storeOnLocalStorage("Token", this.User.token);
                this.router.navigate(['/admin/dashboard/dashboard2']);
                this.loading = false;
              }, 1000);
            } else {
              this.error = 'Invalid Login';
              this.loading = false;
            }
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          },
        });
    }
  }
}
