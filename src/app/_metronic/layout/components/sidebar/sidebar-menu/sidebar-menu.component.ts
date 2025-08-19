import { Component, OnInit } from '@angular/core';
//import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  user:any;
  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    console.log(this.user.role_name)

  }


 //['register_role','edit_role']
  showMenu(permisos:any = []){
    if(this.isRole()){
      return true;
    }
    let permissions =  this.user.permissions;
    console.log(permissions);
    var is_show = false;
   //lee los permisos
   permisos.forEach((permiso:any) => {
        if(permissions.includes(permiso)){
          is_show = true;
        }
    });
    return is_show;
  }

  isRole(){
    return this.user.role_name == 'Super-Admin' ? true : false;
  }
}
