import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderComponent } from './provider.component';
import { ListsProviderComponent } from './lists-provider/lists-provider.component';

const routes: Routes = [{

  path:'',
  component:  ProviderComponent,

  children:[  {
     path:'lists',
     component: ListsProviderComponent
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
