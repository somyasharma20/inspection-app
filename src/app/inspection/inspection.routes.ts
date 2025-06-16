import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { InspectionListView } from './inspectionlistview/inspection-list.component';

export const INSPECTION_ROUTE: Route[] = [

  {
    path: 'report',
    loadChildren: () =>
      import('./report/reports.routes').then(
        (m) => m.REPORT_ROUTE
      ),
  },
  // { // add route for image upload and create a separate component
  //   path: 'uploadImage',
  //   loadChildren: () => 
  // },
    { path: 'inspection-list', component: InspectionListView },

  { path: '**', component: Page404Component },
];
