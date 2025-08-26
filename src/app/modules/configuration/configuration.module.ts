import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { WarehouseModule } from './warehouse/warehouse.module';


@NgModule({
  declarations: [],


  imports: [
    CommonModule,
    ConfigurationRoutingModule,


    SucursalesModule,
    WarehouseModule
  ]
})
export class ConfigurationModule { }
