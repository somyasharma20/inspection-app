import { Route } from '@angular/router';
import { AllSectionsComponent } from './all-sections/all-sections.component';
import { Page404Component } from 'app/authentication/page404/page404.component';

export const SECTION_ROUTE: Route[] = [
  {
    path: 'all-sections',
    component: AllSectionsComponent,
  },
  { path: '**', component: Page404Component },
];
