import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';


@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss'
  ]
})
export class CreateRolesComponent {

  @Output() RoleC: EventEmitter<any> = new EventEmitter();

  name:          string = '';
  isLoading:     any;
  SIDEBAR:any =  SIDEBAR;
  permissions:    any = [];


  constructor(
    public modal: NgbActiveModal,
    public rolesService: RolesService , // Assuming RolesService is injected here
    public toast: ToastrService,
  ) {

  }

  NgOnInit(): void {

  }

  addPermission(permiso:string){
    let INDEX = this.permissions.findIndex((perm:string) => perm === permiso);
    if(INDEX !== -1){
      this.permissions.splice(INDEX, 1);
    }else{
      this.permissions.push(permiso);
    }
    console.log(this.permissions);
  }


  store()
  {
    if(!this.name){
      this.toast.error('validacion', 'El nombre del rol es obligatorio');
      return false;
    }
    if(this.permissions.length === 0){
      this.toast.error('validacion', 'Debe seleccionar al menos un permiso');
      return false;
    }

    let data = {
      name:        this.name,
      permissions: this.permissions
    };

     this.rolesService.RegisterRole(data).subscribe((resp:any) => {
      console.log(resp);

      if(resp.message == 403){
        this.toast.error('validacion', resp.message_text);
      }else{
        this.toast.success('Exito', 'Rol creado correctamente');
        this.RoleC.emit(resp);
        this.modal.close();
      }

    });
  }
}

