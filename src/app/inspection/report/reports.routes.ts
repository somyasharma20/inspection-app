import { Route } from '@angular/router';

import { Page404Component } from 'app/authentication/page404/page404.component';
import { ReportsComponent } from './reports/reports.component';

export const REPORT_ROUTE: Route[] = [
  {
    path: 'report',
    component: ReportsComponent,
  },
  { path: '**', component: Page404Component },
];
