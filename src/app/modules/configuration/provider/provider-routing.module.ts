import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderComponent } from './provider.component';
import { ListProviderComponent } from './list-provider/list-provider.component';

const routes: Routes = [{
  path:'',
  component: ProviderComponent,

  children:[  {

    path:'list',
    component: ListProviderComponent,


  },
 ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
