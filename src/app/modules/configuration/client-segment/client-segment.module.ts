import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSegmentRoutingModule } from './client-segment-routing.module';
import { CreateClientSegmentComponent } from './create-client-segment/create-client-segment.component';
import { EditClientSegmentComponent } from './edit-client-segment/edit-client-segment.component';
import { DeleteClientSegmentComponent } from './delete-client-segment/delete-client-segment.component';
import { ListClientSegmentComponent } from './list-client-segment/list-client-segment.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ClientSegmentComponent } from './client-segment.component';


@NgModule({
  declarations: [
    CreateClientSegmentComponent,
    EditClientSegmentComponent,
    DeleteClientSegmentComponent,
    ListClientSegmentComponent,
    ClientSegmentComponent,

  ],
  imports: [
    CommonModule,
    ClientSegmentRoutingModule,


    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class ClientSegmentModule { }
