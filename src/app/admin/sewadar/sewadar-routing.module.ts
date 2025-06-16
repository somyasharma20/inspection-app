import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSewadarComponent } from './all-sewadar/all-sewadar.component';

const routes: Routes = [

  {
    path: 'all-sewadar',
    component: AllSewadarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SewadarRoutingModule { }
