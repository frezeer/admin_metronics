import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategorieComponent } from './product-categorie.component';
import { ListProductCategorieComponent } from './list-product-categorie/list-product-categorie.component';

const routes: Routes = [{


  path: '',
  component:  ProductCategorieComponent,

  children: [{
    path: 'list',
    component: ListProductCategorieComponent,
  }]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategorieRoutingModule { }
