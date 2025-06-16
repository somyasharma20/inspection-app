import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from 'app/Service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
export class LoginComponent

  implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private authenticationService: AuthenticationService,
  ) {
    //super();
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
  adminSet() {
    this.authForm.get('username')?.setValue('admin@school.org');
    this.authForm.get('password')?.setValue('admin@123');
  }
  teacherSet() {
    this.authForm.get('username')?.setValue('teacher@school.org');
    this.authForm.get('password')?.setValue('teacher@123');
  }
  studentSet() {
    this.authForm.get('username')?.setValue('student@school.org');
    this.authForm.get('password')?.setValue('student@123');
  }
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
      // this.authenticationService.ValidLogin(UserObj).subscribe(_user => {
      //   var userInfo = _user;
      // });
      debugger;
      this.router.navigate(['/admin/dashboard/dashboard2']);
      // this.subs.sink = this.authService
      //   .login(this.f['username'].value, this.f['password'].value)
      //   .subscribe({
      //     next: (res) => {
      //       if (res) {
      //         setTimeout(() => {
      //           const role = this.authService.currentUserValue.role;
      //           // if (role === Role.All || role === Role.Admin) {
      //           //   this.router.navigate(['/admin/dashboard/main']);
      //           // } else if (role === Role.Teacher) {
      //           //   this.router.navigate(['/teacher/dashboard']);
      //           // } else if (role === Role.Student) {
      //           //   this.router.navigate(['/student/dashboard']);
      //           // } else {
      //           //   this.router.navigate(['/authentication/signin']);
      //           // }
      //           this.router.navigate(['/admin/dashboard/dashboard2']);
      //           this.loading = false;
      //         }, 1000);
      //       } else {
      //         this.error = 'Invalid Login';
      //       }
      //     },
      //     error: (error) => {
      //       this.error = error;
      //       this.submitted = false;
      //       this.loading = false;
      //     },
      //   });
    }
  }
}
