import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { SucursalDeliveriesModule } from './sucursal-deliveries/sucursal-deliveries.module';
import { MethodPaymentModule } from './method-payment/method-payment.module';
import { ClientSegmentModule } from './client-segment/client-segment.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';


@NgModule({
  declarations: [

  ],


  imports: [
    CommonModule,
    ConfigurationRoutingModule,


    SucursalesModule,
    WarehouseModule,
    SucursalDeliveriesModule,
    MethodPaymentModule,
    ClientSegmentModule,
    ProductCategoriesModule,
  ]
})
export class ConfigurationModule { }
