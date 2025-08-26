import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { ListWarehouseComponent } from '../../configuration/warehouse/list-warehouse/list-warehouse.component';
import { EditWarehouseComponent } from '../../configuration/warehouse/edit-warehouse/edit-warehouse.component';
import { DeleteWarehouseComponent } from '../../configuration/warehouse/delete-warehouse/delete-warehouse.component';
import { CreateWarehouseComponent } from '../../configuration/warehouse/create-warehouse/create-warehouse.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';



@NgModule({
  declarations: [
    WarehouseComponent,
    CreateWarehouseComponent,
    DeleteWarehouseComponent,
    EditWarehouseComponent,
    ListWarehouseComponent,

  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule
  ]
})
export class WarehouseModule { }
