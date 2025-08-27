import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucursalDeliveriesComponent } from './sucursal-deliveries.component';
import { ListSurcursalDeliveriesComponent } from './list-surcursal-deliveries/list-surcursal-deliveries.component';

const routes: Routes = [{
  path: '',
  component: SucursalDeliveriesComponent,

  children: [
    {
      path: 'list',
      component: ListSurcursalDeliveriesComponent,
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalDeliveriesRoutingModule { }
