import { Route } from '@angular/router';
import { AllEmployeeComponent } from './all-employee/all-employee.component';
import { Page404Component } from 'app/authentication/page404/page404.component';

export const EMPLOYEE_ROUTE: Route[] = [
  {
    path: 'all-employee',
    component: AllEmployeeComponent,
  },
  { path: '**', component: Page404Component },
];
