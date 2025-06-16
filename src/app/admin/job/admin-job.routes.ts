
import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { AddJobComponent } from './add-job/add-job/add-job.component';
import { AddJobdetailComponent } from './add-jobdetail/add-jobdetail.component';
export const ADMIN_JOB_ROUTE: Route[] = [
  // {
  //   path: 'all-teachers',
  //   component: AllTeachersComponent, 
  // },
  {
    path: 'add-job',
    component: AddJobComponent,
  },
  {
    path: 'add-jobdetail/:id',
    component: AddJobdetailComponent,
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
