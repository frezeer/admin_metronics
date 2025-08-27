import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalDeliveriesRoutingModule } from './sucursal-deliveries-routing.module';
import { SucursalDeliveriesComponent } from './sucursal-deliveries.component';
import { CreateSurcursalDeliveriesComponent } from './create-surcursal-deliveries/create-surcursal-deliveries.component';
import { EditSurcursalDeliveriesComponent } from './edit-surcursal-deliveries/edit-surcursal-deliveries.component';
import { DeleteSurcursalDeliveriesComponent } from './delete-surcursal-deliveries/delete-surcursal-deliveries.component';
import { ListSurcursalDeliveriesComponent } from './list-surcursal-deliveries/list-surcursal-deliveries.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    SucursalDeliveriesComponent,
    CreateSurcursalDeliveriesComponent,
    EditSurcursalDeliveriesComponent,
    DeleteSurcursalDeliveriesComponent,
    ListSurcursalDeliveriesComponent
  ],
  imports: [
    CommonModule,
    SucursalDeliveriesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule
  ]
})
export class SucursalDeliveriesModule { }
