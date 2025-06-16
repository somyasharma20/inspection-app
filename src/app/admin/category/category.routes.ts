import { Route } from '@angular/router';
import { AllCategoryComponent } from './all-category/all-category.component';
import { Page404Component } from 'app/authentication/page404/page404.component';

export const CATEGORY_ROUTE: Route[] = [
  {
    path: 'all-category',
    component: AllCategoryComponent,
  },
  { path: '**', component: Page404Component },
];
