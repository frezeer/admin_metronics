import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'sucursales',
        loadChildren: () => import('./sucursales/sucursales.module').then((m) => m.SucursalesModule),
    },
     {
         path: 'almacenes',
         loadChildren: () => import('./warehouse/warehouse.module').then((m) => m.WarehouseModule),
     },

       {
         path: 'lugar-de-entrega',
         loadChildren: () => import('./sucursal-deliveries/sucursal-deliveries.module').then((m) => m.SucursalDeliveriesModule),
     },

       {
         path: 'metodo-de-pago',
         loadChildren: () => import('./method-payment/method-payment.module').then((m) => m.MethodPaymentModule),
     }
     ,

       {
         path: 'segmento-de-cliente',
         loadChildren: () => import('./client-segment/client-segment.module').then((m) => m.ClientSegmentModule),
       }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
