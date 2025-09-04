import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsUnitsComponent } from './lists-units/lists-units.component';
import { UnitsComponent } from './units.component';

const routes: Routes = [
  {
    path: '',
    component: UnitsComponent,
    children: [
      {
        path: 'lists',
        component: ListsUnitsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
