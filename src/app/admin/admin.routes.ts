import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { UnAuthComponent } from './un-auth/un-auth.component';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
  },
  {
    path: 'branch',
    loadChildren: () =>
      import('./branch/admin-branch.routes').then(
        (m) => m.ADMIN_BRANCH_ROUTE
      ),
  },
  {
    path: 'machine',
    loadChildren: () =>
      import('./machine/admin-machine.routes').then(
        (m) => m.ADMIN_MACHINE_ROUTE
      ),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/admin-customer.routes').then(
        (m) => m.ADMIN_CUSTOMER_ROUTE
      ),
  },
  {
    path: 'style',
    loadChildren: () =>
      import('./style/admin-style.routes').then(
        (m) => m.ADMIN_STYLE_ROUTE
      ),
  },

  {
    path: 'job',
    loadChildren: () =>
      import('./job/admin-job.routes').then(
        (m) => m.ADMIN_JOB_ROUTE
      ),
  },
  {
    path: 'sewadar',
    loadChildren: () =>
      import('./sewadar/sewadar-routing.module').then(
        (m) => m.SewadarRoutingModule
      ),
  },
  // {
  //   path: 'students',
  //   loadChildren: () =>
  //     import('./students/admin-students.routes').then(
  //       (m) => m.ADMIN_STUDENT_ROUTE
  //     ),
  // },
  // {
  //   path: 'courses',
  //   loadChildren: () =>
  //     import('./courses/courses.routes').then((m) => m.COURSE_ROUTE),
  // },
  // {
  //   path: 'library',
  //   loadChildren: () =>
  //     import('./library/library.routes').then((m) => m.LIBRARY_ROUTE),
  // },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.routes').then(
        (m) => m.DEPARTMENT_ROUTE
      ),
  },
  {
    path: 'section',
    loadChildren: () =>
      import('./section/section.routes').then(
        (m) => m.SECTION_ROUTE
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.routes').then(
        (m) => m.USER_ROUTE
      ),
  },
  {
    path: 'item',
    loadChildren: () =>
      import('./item/item.routes').then(
        (m) => m.ITEM_ROUTE
      ),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.routes').then(
        (m) => m.CATEGORY_ROUTE
      ),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.routes').then(
        (m) => m.EMPLOYEE_ROUTE
      ),
  },
  // {
  //   path: 'staff',
  //   loadChildren: () =>
  //     import('./staff/staff.routes').then((m) => m.STAFF_ROUTE),
  // },
  // {
  //   path: 'holidays',
  //   loadChildren: () =>
  //     import('./holidays/holidays.routes').then((m) => m.HOLIDAY_ROUTE),
  // },
  // {
  //   path: 'fees',
  //   loadChildren: () => import('./fees/fees.routes').then((m) => m.FEES_ROUTE),
  // },
  // {
  //   path: 'attendance',
  //   loadChildren: () =>
  //     import('./attendance/attendance.routes').then((m) => m.ATTENDANCE_ROUTE),
  // },
  {
    path: "un-auth",
    component: UnAuthComponent,
  },
  { path: '**', component: Page404Component },
];
