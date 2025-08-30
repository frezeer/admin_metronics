import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategorieRoutingModule } from './product-categorie-routing.module';
import { ProductCategorieComponent } from './product-categorie.component';
import { CreateProductCategorieComponent } from './create-product-categorie/create-product-categorie.component';
import { EditProductCategorieComponent } from './edit-product-categorie/edit-product-categorie.component';
import { ListProductCategorieComponent } from './list-product-categorie/list-product-categorie.component';
import { DeleteProductCategorieComponent } from './delete-product-categorie/delete-product-categorie.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    ProductCategorieComponent,
    CreateProductCategorieComponent,
    EditProductCategorieComponent,
    ListProductCategorieComponent,
    DeleteProductCategorieComponent
  ],
  imports: [
    CommonModule,
    ProductCategorieRoutingModule,


    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class ProductCategorieModule { }
