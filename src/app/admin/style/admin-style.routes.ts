
import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { AddStyleComponent } from './add-style/add-style/add-style.component';
export const ADMIN_STYLE_ROUTE: Route[] = [
  // {
  //   path: 'all-teachers',
  //   component: AllTeachersComponent, 
  // },
  {
    path: 'add-style',
    component: AddStyleComponent,
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
