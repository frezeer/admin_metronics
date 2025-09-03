import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { EditProviderComponent } from './edit-provider/edit-provider.component';
import { DeleteProviderComponent } from './delete-provider/delete-provider.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ListsProviderComponent } from './lists-provider/lists-provider.component';


@NgModule({
  declarations: [
    ProviderComponent,
    CreateProviderComponent,
    EditProviderComponent,
    DeleteProviderComponent,
    ListsProviderComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,


    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class ProviderModule { }
