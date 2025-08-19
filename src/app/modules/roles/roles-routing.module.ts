import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { RolesComponent } from './roles.component';

const routes: Routes = [

{
  path:'',
  component: RolesComponent,

  children: [
    {
      path: 'list',
      component:ListRolesComponent //manda a llamar al componente list-roles
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
