import { Route } from '@angular/router';
import { AllItemsComponent } from './all-items/all-items.component';
import { Page404Component } from 'app/authentication/page404/page404.component';

export const ITEM_ROUTE: Route[] = [
  {
    path: 'all-items',
    component: AllItemsComponent,
  },
  { path: '**', component: Page404Component },
];
