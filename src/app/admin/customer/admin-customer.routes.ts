import { AddCustomerComponent } from './add-customer/add-customer/add-customer.component';
import { Route } from '@angular/router';
// import { AllTeachersComponent } from './all-teachers/all-teachers.component';
// import { AddTeacherComponent } from './add-teacher/add-teacher.component';
// import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
// import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { Page404Component } from 'app/authentication/page404/page404.component';





export const ADMIN_CUSTOMER_ROUTE: Route[] = [
  // {
  //   path: 'all-teachers',
  //   component: AllTeachersComponent, 
  // },
  {
    path: 'add-customer',
    component: AddCustomerComponent,
  },
  // {
  //   path: 'edit-teacher',
  //   component: EditTeacherComponent,
  // },
  // {
  //   path: 'about-teacher',
  //   component: AboutTeacherComponent,
  // },
  { path: '**', component: Page404Component },
];
