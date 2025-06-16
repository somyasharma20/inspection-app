import { Route } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserBranchComponent } from './user-branch/user-branch.component';
import { Page404Component } from 'app/authentication/page404/page404.component';

export const USER_ROUTE: Route[] = [
  {
    path: 'all-users',
    component: AllUsersComponent,
  },
  { 
    path: 'user-branch/:id', 
    component: UserBranchComponent },
  { path: '**', component: Page404Component },
];
