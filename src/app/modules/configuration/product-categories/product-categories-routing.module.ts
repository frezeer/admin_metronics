import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoriesComponent } from './product-categories.component';

const routes: Routes = [{
  path: '',
  component: ProductCategoriesComponent,

  children: [
    {
      path: 'list',
      component:ProductCategoriesComponent ,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoriesRoutingModule { }
