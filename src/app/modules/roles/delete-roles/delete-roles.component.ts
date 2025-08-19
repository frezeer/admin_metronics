import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss']
})
export class DeleteRolesComponent {


  //emisores que vienen del componente padre en este caso ListRolesComponent
   @Output() RoleD: EventEmitter<any> = new EventEmitter();
   @Input()  ROLE_SELECTED: any; //EMITIR UN VALOR A ESTE COMPONENTE DESDE EL PADRE

    name:          string = '';
    isLoading:     any;
    SIDEBAR:any =  SIDEBAR;
    permisions:    any = [];


    constructor(
      public modal: NgbActiveModal,
      public rolesService: RolesService , // Assuming RolesService is injected here
      public toast: ToastrService,
    ) {

    }

    NgOnInit(): void {
    }



    delete()
    {
       this.rolesService.deleteRol(this.ROLE_SELECTED.id).subscribe((resp:any) => {
         console.log(resp);
        if(resp.message == 403){
          this.toast.error('validacion', resp.message_text);
        }else{
          this.toast.success('Exito', 'Rol eliminado correctamente');
          this.RoleD.emit(resp);
          this.modal.close();
        }

      });
    }

}
